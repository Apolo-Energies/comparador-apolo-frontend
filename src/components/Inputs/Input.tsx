import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn<Path<T>>;
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
  required = false,
  errors,
  defaultValue,
  helperText,
}: Props<T>) => {
  const errorMessage = errors?.[name]?.message as string | undefined;

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
        {...register}
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
