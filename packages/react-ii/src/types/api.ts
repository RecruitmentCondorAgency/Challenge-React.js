export interface APIResponse<T> {
    error: ErrorMessage
    status: string
    response: T
}
export interface ErrorMessage {
    message: string
    code: string
} 
