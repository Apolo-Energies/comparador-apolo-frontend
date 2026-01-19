// FormUserIndividual.tsx
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/Inputs/Input";
import { Select } from "@/components/Selects/Select";
import { CreateIndividualUserRequest } from "../../interfaces/CreateUserRequest";

interface Props {
  register: UseFormRegister<CreateIndividualUserRequest>;
  errors: FieldErrors<CreateIndividualUserRequest>;
}

export const FormIndividualUser = ({ register, errors }: Props) => {
  return (
    <div className="space-y-6">

      {/* EMAIL - Obligatorio */}
      <Input
        label="Email"
        name="email"
        required
        register={register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email inválido",
          },
        })}
        errors={errors}
      />

      {/* ROL - Obligatorio */}
      <Select<CreateIndividualUserRequest>
        label="Rol"
        name="role"
        required
        options={[
          { label: "Master", value: 1 },
          { label: "Colaborador", value: 2 },
        ]}
        register={register("role", {
          required: "El rol es obligatorio",
        })}
        errors={errors}
      />

      {/* NOMBRE - Obligatorio */}
      <Input
        label="Nombre"
        name="name"
        required
        register={register("name", {
          required: "El nombre es obligatorio",
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
        })}
        errors={errors}
      />

      {/* APELLIDOS - Obligatorio */}
      <Input
        label="Apellidos"
        name="surnames"
        required
        register={register("surnames", {
          required: "Los apellidos son obligatorios",
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
        })}
        errors={errors}
      />

      {/* DNI - Obligatorio */}
      <Input
        label="DNI"
        name="dni"
        required
        register={register("dni", {
          required: "El DNI es obligatorio",
          pattern: {
            value: /^[0-9]{8}[A-Za-z]$/,
            message: "Formato inválido. Ej: 12345678A",
          },
        })}
        errors={errors}
      />

      {/* TELÉFONO - Opcional */}
      <Input
        label="Teléfono (opcional)"
        name="phone"
        register={register("phone", {
          validate: (v) =>
            !v || /^\+34[0-9]{9}$/.test(v) || "Debe empezar con +34 y tener 9 dígitos",
        })}
        errors={errors}
      />

      {/* DOMICILIO LEGAL - Opcional */}
      <Input
        label="Domicilio Legal (opcional)"
        name="legalAddress"
        register={register("legalAddress", {
          validate: (v) => !v || v.length >= 5 || "Mínimo 5 caracteres",
        })}
        errors={errors}
      />

      {/* DOMICILIO NOTIFICACIONES - Opcional */}
      <Input
        label="Domicilio Notificaciones (opcional)"
        name="notificationAddress"
        register={register("notificationAddress", {
          validate: (v) => !v || v.length >= 5 || "Mínimo 5 caracteres",
        })}
        errors={errors}
      />

      {/* CUENTA BANCARIA - Opcional */}
      <Input
        label="Cuenta Bancaria (opcional)"
        name="bankAccount"
        register={register("bankAccount", {
          validate: (v) =>
            !v || /^ES\d{2}(?:\s?\d{4}){5}$/.test(v) || "IBAN inválido (Ej: ESXX XXXX XXXX XXXX XXXX XXXX)",
        })}
        errors={errors}
      />
    </div>
  );
};
