import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/Inputs/Input";
import { Select } from "@/components/Selects/Select";
import { CreateUserRequest } from "../../interfaces/CreateUserRequest";

interface Props {
  register: UseFormRegister<CreateUserRequest>;
  errors: FieldErrors<CreateUserRequest>;
  personType: 0 | 1;
}

export const FormUser = ({ register, errors, personType }: Props) => {
  return (
    <div className="space-y-6">

      {/* EMAIL */}
      <Input
        label="Email"
        name="email"
        register={register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email inválido",
          },
        })}
        errors={errors}
      />

      {/* ROL */}
      <Select<CreateUserRequest>
        label="Rol"
        name="role"
        options={[
          { label: "Master", value: 1 },
          { label: "Colaborador", value: 2 },
        ]}
        register={register("role", {
          required: "El rol es obligatorio",
        })}
        errors={errors}
      />

      {/* NOMBRE */}
      <Input
        label="Nombre"
        name="name"
        register={register("name", {
          required: "El nombre es obligatorio",
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
        })}
        errors={errors}
      />

      {/* APELLIDOS */}
      <Input
        label="Apellidos"
        name="surnames"
        register={register("surnames", {
          required: "Los apellidos son obligatorios",
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
        })}
        errors={errors}
      />

      {/* DNI */}
      <Input
        label="DNI"
        name="dni"
        register={register("dni", {
          required: "El DNI es obligatorio",
          pattern: {
            value: /^[0-9]{8}[A-Za-z]$/,
            message: "Formato inválido. Ej: 12345678A",
          },
        })}
        errors={errors}
      />

      {/* SOLO COMPANY */}
      {personType === 1 && (
        <>
          <Input
            label="CIF"
            name="cif"
            register={register("cif", {
              required: "El CIF es obligatorio",
              pattern: {
                value: /^[A-Z]\d{7}[A-Z0-9]$/,
                message: "CIF inválido. Ej: B56263304",
              },
            })}
            errors={errors}
          />

          <Input
            label="Razón Social"
            name="companyName"
            register={register("companyName", {
              required: "La razón social es obligatoria",
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
            })}
            errors={errors}
          />
        </>
      )}

      {/* OPCIONALES */}
      <Input
        label="Teléfono"
        name="phone"
        register={register("phone", {
          validate: (v) =>
            !v || /^\+34[0-9]{9}$/.test(v) || "Debe empezar con +34 y tener 9 dígitos",
        })}
        errors={errors}
      />

      <Input
        label="Domicilio Legal"
        name="legalAddress"
        register={register("legalAddress", {
          validate: (v) => !v || v.length >= 5 || "Mínimo 5 caracteres",
        })}
        errors={errors}
      />

      <Input
        label="Domicilio Notificaciones"
        name="notificationAddress"
        register={register("notificationAddress", {
          validate: (v) => !v || v.length >= 5 || "Mínimo 5 caracteres",
        })}
        errors={errors}
      />

      <Input
        label="Cuenta bancaria"
        name="bankAccount"
        register={register("bankAccount", {
          validate: (v) =>
            !v || /^ES\d{2}(?:\s?\d{4}){5}$/.test(v) || "IBAN  inválido (Ej: ESXX XXXX XXXX XXXX XXXX XXXX)",
        })}
        errors={errors}
      />
    </div>
  );
};
