// utils
import { env } from "@/lib/config/env.mjs"
import { buildQueryString, clientErrorHandler } from "@/lib/utils"

// types
import type { RequestConfig } from "@/lib/types"

// GET HTTP Method
export async function getRequest<T>({
  url,
  params,
  headers = {},
  transformResponse,
  customURL,
}: RequestConfig<T>): Promise<T> {
  try {
    // Full URL with query string
    const fullUrl = `${env.NEXT_PUBLIC_APP_URL}/api/v1/${url}${buildQueryString(params)}`

    // Use customURL if provided, otherwise use fullUrl
    const requestUrl = customURL || fullUrl

    // Perform fetch request
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-store",
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json()
      return Promise.reject({ status: response.status, ...errorData })
    }

    const data = await response.json()

    // Transform response data if transformer is provided
    const transformedData: T = transformResponse
      ? transformResponse(data)
      : data

    return transformedData
  } catch (error: unknown) {
    return Promise.reject(clientErrorHandler(error))
  }
}

// POST HTTP Method
export async function postRequest<T, U>({
  url,
  params,
  headers = {},
  body,
  transformResponse,
  customURL,
}: RequestConfig<U> & { body: U }): Promise<T> {
  try {
    // Full URL with query string
    const fullUrl = `${env.NEXT_PUBLIC_APP_URL}/api/v1/${url}${buildQueryString(params)}`

    // Use customURL if provided, otherwise use fullUrl
    const requestUrl = customURL || fullUrl

    // Perform fetch request
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-store",
      body: JSON.stringify(body),
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json()
      return Promise.reject({ status: response.status, ...errorData })
    }

    const data = await response.json()

    // Transform response data if transformer is provided
    const transformedData: T = transformResponse
      ? transformResponse(data)
      : data

    return transformedData
  } catch (error: unknown) {
    return Promise.reject(clientErrorHandler(error))
  }
}

// PATCH HTTP Method
export async function patchRequest<T, U>({
  url,
  params,
  headers = {},
  body,
  transformResponse,
  customURL,
}: RequestConfig<U> & { body: U }): Promise<T> {
  try {
    // Full URL with query string
    const fullUrl = `${env.NEXT_PUBLIC_APP_URL}/api/v1/${url}${buildQueryString(params)}`

    // Use customURL if provided, otherwise use fullUrl
    const requestUrl = customURL || fullUrl

    // Perform fetch request
    const response = await fetch(requestUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-store",
      body: JSON.stringify(body),
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json()
      return Promise.reject({ status: response.status, ...errorData })
    }

    const data = await response.json()

    // Transform response data if transformer is provided
    const transformedData: T = transformResponse
      ? transformResponse(data)
      : data

    return transformedData
  } catch (error: unknown) {
    return Promise.reject(clientErrorHandler(error))
  }
}

// DELETE HTTP Method
export async function deleteRequest<T>({
  url,
  params,
  headers = {},
  transformResponse,
  customURL,
}: RequestConfig<void>): Promise<T> {
  try {
    // Full URL with query string
    const fullUrl = `${env.NEXT_PUBLIC_APP_URL}/api/v1/${url}${buildQueryString(params)}`

    // Use customURL if provided, otherwise use fullUrl
    const requestUrl = customURL || fullUrl

    // Perform fetch request
    const response = await fetch(requestUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-store",
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json()
      return Promise.reject({ status: response.status, ...errorData })
    }

    const data = await response.json()

    // Transform response data if transformer is provided
    const transformedData: T = transformResponse
      ? transformResponse(data)
      : data

    return transformedData
  } catch (error: unknown) {
    return Promise.reject(clientErrorHandler(error))
  }
}
