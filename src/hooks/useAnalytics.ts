import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { withTimeout } from '../lib/adminConfig'
import { getVisitorSessionId } from '../lib/session'
import type { AnalyticsSummary, CreateReservationInput, Reservation, ReservationStatus } from '../types/analytics'

export function useTrackPageView() {
  return useMutation({
    mutationFn: async ({ path, userId }: { path: string; userId?: string }) => {
      const { error } = await supabase.from('page_views').insert({
        path,
        session_id: getVisitorSessionId(),
        user_id: userId ?? null,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      })
      if (error) throw error
    },
    retry: false,
  })
}

export function useAnalyticsSummary(enabled = true) {
  return useQuery({
    queryKey: ['analytics-summary'],
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<AnalyticsSummary> => {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const since = sevenDaysAgo.toISOString()

      const empty: AnalyticsSummary = {
        totalViews: 0,
        uniqueVisitors: 0,
        viewsLast7Days: 0,
        totalReservations: 0,
        pendingReservations: 0,
        confirmedReservations: 0,
        paidReservations: 0,
        totalPayments: 0,
        revenueKz: 0,
        topPages: [],
        recentReservations: [],
      }

      try {
        const [viewsRes, views7Res, reservationsRes, paymentsRes, recentRes] = await withTimeout(
          Promise.all([
            supabase.from('page_views').select('id, path, session_id', { count: 'exact' }),
            supabase.from('page_views').select('id', { count: 'exact' }).gte('created_at', since),
            supabase.from('reservations').select('*').order('created_at', { ascending: false }),
            supabase.from('payments').select('*').eq('status', 'succeeded'),
            supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(8),
          ]),
          4000,
        )

        if (viewsRes.error) throw viewsRes.error
        if (reservationsRes.error) throw reservationsRes.error
        if (paymentsRes.error) throw paymentsRes.error
        if (recentRes.error) throw recentRes.error

        const views = viewsRes.data ?? []
        const uniqueSessions = new Set(views.map((v) => v.session_id).filter(Boolean))

        const pathCounts = views.reduce<Record<string, number>>((acc, v) => {
          acc[v.path] = (acc[v.path] ?? 0) + 1
          return acc
        }, {})

        const topPages = Object.entries(pathCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([path, count]) => ({ path, count }))

        const reservations = (reservationsRes.data ?? []) as Reservation[]

        return {
          totalViews: viewsRes.count ?? views.length,
          uniqueVisitors: uniqueSessions.size,
          viewsLast7Days: views7Res.count ?? 0,
          totalReservations: reservations.length,
          pendingReservations: reservations.filter((r) => r.status === 'pending').length,
          confirmedReservations: reservations.filter((r) => r.status === 'confirmed').length,
          paidReservations: reservations.filter((r) => r.status === 'paid').length,
          totalPayments: paymentsRes.data?.length ?? 0,
          revenueKz: (paymentsRes.data ?? []).reduce((sum, p) => sum + (p.amount_kz ?? 0), 0),
          topPages,
          recentReservations: (recentRes.data ?? []) as Reservation[],
        }
      } catch {
        return empty
      }
    },
    refetchInterval: 120_000,
  })
}

export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateReservationInput) => {
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          ...input,
          source: 'website',
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error
      return data as Reservation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics-summary'] })
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
    },
  })
}

export function useReservations() {
  return useQuery({
    queryKey: ['reservations'],
    staleTime: 60_000,
    queryFn: async () => {
      try {
        const { data, error } = await withTimeout(
          supabase.from('reservations').select('*').order('created_at', { ascending: false }),
        )
        if (error) throw error
        return data as Reservation[]
      } catch {
        return [] as Reservation[]
      }
    },
  })
}

export function useMyReservations(userId?: string) {
  return useQuery({
    queryKey: ['my-reservations', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', userId!)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Reservation[]
    },
  })
}

export function useUpdateReservationStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      status,
      amount_kz,
    }: {
      id: string
      status: ReservationStatus
      amount_kz?: number
    }) => {
      const { data, error } = await supabase
        .from('reservations')
        .update({ status, updated_at: new Date().toISOString(), ...(amount_kz ? { amount_kz } : {}) })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Reservation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['analytics-summary'] })
    },
  })
}

export function useRecordPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      reservationId,
      amount_kz,
    }: {
      reservationId: string
      amount_kz: number
    }) => {
      const now = new Date().toISOString()

      const { error: payError } = await supabase.from('payments').insert({
        reservation_id: reservationId,
        amount_kz,
        currency: 'AOA',
        provider: 'manual',
        status: 'succeeded',
        paid_at: now,
      })

      if (payError) throw payError

      const { data, error } = await supabase
        .from('reservations')
        .update({ status: 'paid', amount_kz, updated_at: now })
        .eq('id', reservationId)
        .select()
        .single()

      if (error) throw error
      return data as Reservation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['analytics-summary'] })
    },
  })
}
