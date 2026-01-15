import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T> | UseFormRegisterReturn<Path<T>>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  errors?: FieldErrors<T>;
  defaultValue?: string | number;
  helperText?: string;
}

export const Input = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  registerOptions,
  required = false,
  errors,
  defaultValue,
  helperText,
}: Props<T>) => {
  const errorMessage = errors?.[name]?.message as string | undefined;

  // Determine if register is a function (UseFormRegister) or already a return value (UseFormRegisterReturn)
  const registerProps =
    typeof register === "function"
      ? register(name, registerOptions ?? { required: required ? `${label} es requerido` : false })
      : register;

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...registerProps}
        defaultValue={defaultValue}
        className={`w-full placeholder:text-gray-400 bg-input text-sm rounded border px-3 py-1.5 focus:outline-none focus:ring ${
          errorMessage
            ? "border-red-500 ring-red-500"
            : "border-border ring-blue-500"
        }`}
      />

      {/* ERROR tiene prioridad */}
      {errorMessage ? (
        <p className="text-xs text-red-600">{errorMessage}</p>
      ) : (
        helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )
      )}
    </div>
  );
};
