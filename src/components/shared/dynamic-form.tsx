// components
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import { AutosizeTextarea } from "@/components/shared/autosize-textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import SubmitButton from "@/components/ui/submit-button"

// utils
import { cn } from "@/lib/utils"
import Link from "next/link"

// types
import type { DynamicFormProps } from "@/lib/types"
import type { FieldValues } from "react-hook-form"

const DynamicForm = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitButtonTitle,
  formMutation,
  className,
  isSignIn,
  buttonClassName,
}: DynamicFormProps<TFieldValues>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-5", className)}
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            control={form.control}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  {field.isAutosizeTextarea ? (
                    <AutosizeTextarea
                      {...formField}
                      id={field.name}
                      placeholder={field.placeholder}
                      disabled={formMutation.isPending}
                      maxHeight={field.props?.maxHeight}
                      minHeight={field.props?.minHeight}
                      className={cn(
                        "!w-[300px] px-4 text-white bg-gradient-to-br from-green-950 to-blue-950 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                        form.formState.errors[field.name]
                          ? "border-red-600 focus:ring-0"
                          : "",
                        field.className,
                      )}
                    />
                  ) : field.component ? (
                    <field.component
                      {...formField}
                      {...field.props}
                      disabled={formMutation.isPending}
                    />
                  ) : (
                    <FloatingLabelInput
                      {...formField}
                      id={field.name}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      disabled={formMutation.isPending}
                      hasErrors={!!form.formState.errors[field.name]}
                      className={cn(
                        form.formState.errors[field.name]
                          ? "border-red-600 focus:ring-0"
                          : "",
                        field.className,
                      )}
                      isPassword={field.type === "password"}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* forgot password */}
        {isSignIn && (
          <SubmitButton
            variant="link"
            size="sm"
            asChild
            buttonClassName="ml-[190px]"
          >
            <Link href="/forgot-password">
              <span className="text-sm text-muted-foreground">
                Forgot password?
              </span>
            </Link>
          </SubmitButton>
        )}

        {/* form submit button */}
        <SubmitButton
          type="submit"
          title={submitButtonTitle}
          disabled={formMutation.isPending}
          buttonClassName={cn(
            "w-full !w-[50px] focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 !mt-1 bg-gradient-to-br from-green-800 to-blue-800 border border-green-900",
            buttonClassName,
          )}
        />
      </form>
    </Form>
  )
}

export default DynamicForm
