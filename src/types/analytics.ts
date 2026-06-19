export type UserRole = 'guest' | 'admin'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
}

export type ReservationStatus = 'pending' | 'confirmed' | 'paid' | 'cancelled'
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded'

export interface Reservation {
  id: string
  property_slug: string
  property_label: string | null
  check_in: string
  check_out: string | null
  guests: number
  guest_name: string
  guest_email: string
  guest_phone: string | null
  status: ReservationStatus
  amount_kz: number | null
  user_id: string | null
  source: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  reservation_id: string
  amount_kz: number
  currency: string
  provider: string | null
  status: PaymentStatus
  paid_at: string | null
  created_at: string
}

export interface PageView {
  id: string
  path: string
  session_id: string | null
  user_id: string | null
  created_at: string
}

export interface AnalyticsSummary {
  totalViews: number
  uniqueVisitors: number
  viewsLast7Days: number
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  paidReservations: number
  totalPayments: number
  revenueKz: number
  topPages: { path: string; count: number }[]
  recentReservations: Reservation[]
}

export interface CreateReservationInput {
  property_slug: string
  property_label: string
  check_in: string
  check_out: string | null
  guests: number
  guest_name: string
  guest_email: string
  guest_phone?: string
  amount_kz?: number
  user_id?: string | null
}
