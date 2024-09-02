// types
import type { IncomingMessage } from "node:http"
import type { Metadata, Viewport } from "next"
import type {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"

/* Compatible Request Type */
export interface CompatibleRequest extends IncomingMessage {
  headers: Record<string, string | string[]>
}

// init request config
export type RequestConfig<T> = {
  url?: string
  params?: Record<string, string | number | boolean>
  headers?: HeadersInit
  transformResponse?: (data: unknown) => T
  customURL?: string
}

/* --------------Utils Types---------------- */

/* Error Response Data Type */
export interface ErrorResponseData {
  message: string
  statusCode?: number
}

/* Verification Data Type */
export interface VerificationData {
  verificationToken?: string
  email?: string
}

/* Reset Data Type */
export interface ResetPasswordData {
  resetPasswordToken?: string
  email?: string
}

/* Unique Id Type */
export type UniqueId = string

/* --------------Meta Data Types---------------- */

/* Site Config Type */
export type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}

/* Field Config Props Type */
export interface FieldConfig<TFieldValues> {
  name: Path<TFieldValues>
  type: string
  label: string
  placeholder: string
  className?: string
  value?: number | string
  component?: React.ComponentType<any>
  props?: Record<string, any>
  isAutosizeTextarea?: boolean
}

/* Mutation Props Type */
export interface FormMutation {
  isPending: boolean
}

/* Dynamic Form Props Type */
export interface DynamicFormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  fields: FieldConfig<TFieldValues>[]
  submitButtonTitle: string | React.ReactNode
  formMutation: FormMutation
  className?: string
  isSignIn?: boolean
  buttonClassName?: string
}
