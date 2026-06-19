/** Entrada sem password (temporário). Defina VITE_ADMIN_REQUIRE_LOGIN=true para exigir login. */
export const isAdminBypassEnabled = import.meta.env.VITE_ADMIN_REQUIRE_LOGIN !== 'true'

export function withTimeout<T>(promise: Promise<T>, ms = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), ms)
    }),
  ])
}
