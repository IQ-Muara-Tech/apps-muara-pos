export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const baseURL = config.public.apiBase as string

  const api = $fetch.create({
    baseURL,
    headers: { 'Accept': 'application/json' },
    onRequest({ options }) {
      if (auth.token) {
        options.headers = {
          ...(options.headers as Record<string, string>),
          'Authorization': `Bearer ${auth.token}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
      }
    }
  })

  async function get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)])
    ).toString() : ''
    return api<T>(`${url}${qs}`)
  }

  async function post<T>(url: string, body?: any): Promise<T> {
    return api<T>(url, { method: 'POST', body })
  }

  async function put<T>(url: string, body?: any): Promise<T> {
    return api<T>(url, { method: 'PUT', body })
  }

  async function del<T>(url: string): Promise<T> {
    return api<T>(url, { method: 'DELETE' })
  }

  return { get, post, put, del, baseURL }
}
