import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTrackPageView } from '../../hooks/useAnalytics'
import { useUser } from '../../context/UserContext'

export function PageViewTracker() {
  const location = useLocation()
  const { mutate: track } = useTrackPageView()
  const { user } = useUser()

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return

    track({ path: location.pathname, userId: user?.id })
  }, [location.pathname, track, user?.id])

  return null
}
