import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldPath, UseFormReturn } from "react-hook-form"

interface FormTextFieldProps<TFormValues extends Record<string, unknown>> {
  form: UseFormReturn<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
  placeholder: string;
}

export function FormTextField<TFormValues extends Record<string, unknown>>({ 
  form, name, label, placeholder 
}: FormTextFieldProps<TFormValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value as string}
              disabled={field.disabled}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}