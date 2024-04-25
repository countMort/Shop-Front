export type MindleResponse<T = any> = {
  success: boolean
  results: T
  message: string
}
