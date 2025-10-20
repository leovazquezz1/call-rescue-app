import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

export class ApiError extends Error {
  statusCode: number
  detail: string
  raw: unknown

  constructor(statusCode: number, detail: string, raw?: unknown) {
    super(detail)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.detail = detail
    this.raw = raw
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError

export const extractApiError = (error: unknown): {
  message: string
  statusCode?: number
} => {
  if (isApiError(error)) {
    return { message: error.detail, statusCode: error.statusCode }
  }
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status
    const detail =
      // FastAPI ErrorResponse shape
      (error.response?.data as any)?.detail || (error.response?.data as any)?.message ||
      error.message ||
      'Request failed'
    return { message: detail, statusCode }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'An unknown error occurred' }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize all errors into ApiError
    if (error?.response) {
      const data = error.response.data as { status_code?: number; detail?: string; message?: string }
      const statusCode = data?.status_code ?? error.response.status ?? 0
      const detail = data?.detail ?? data?.message ?? 'Request failed'
      return Promise.reject(new ApiError(statusCode, detail, data))
    }
    if (error?.request) {
      return Promise.reject(new ApiError(0, 'Network error', error.message))
    }
    return Promise.reject(new ApiError(0, error?.message || 'Unknown error', error))
  }
)

export default api
