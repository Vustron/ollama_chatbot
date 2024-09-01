// types
import type { IncomingMessage } from "node:http"
import type { Metadata, Viewport } from "next"

// init request config
export type RequestConfig<T> = {
  url?: string
  params?: Record<string, string | number | boolean>
  headers?: HeadersInit
  transformResponse?: (data: unknown) => T
  customURL?: string
}
export interface ErrorResponseData {
  message: string
  statusCode?: number
}

export interface AxiosErrorResponse {
  error: string
}

export interface RequestHelloWorld {
  message: string
}

export interface CompatibleRequest extends IncomingMessage {
  headers: Record<string, string | string[]>
}
export type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}
