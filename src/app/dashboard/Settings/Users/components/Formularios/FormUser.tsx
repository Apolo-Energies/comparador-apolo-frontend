import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { User } from "../../interfaces/user";
import { Input } from "@/components/Inputs/Input";
import { Select } from "@/components/Selects/Select";

interface Props {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
}

export const FormUser = ({ register, errors }: Props) => {
  return (
    <div className="space-y-2">
      <p className="text-xs mx-0 mb-2">
        Complete los datos básicos del usuario
      </p>
      <div className="grid grid-cols-1 gap-2">
        <Input
          label="Nombre Completo"
          name="nombreCompleto"
          placeholder="Apolo"
          register={register}
          required
          errors={errors}
        />

        <Input
          label="Emai"
          name="email"
          placeholder="apolo@apoloenergies.es"
          register={register}
          required
          errors={errors}
        />

        <Select<User>
          label="Rol"
          name="role"
          options={[
            { label: "Master", value: 1 },
            { label: "Colaborador", value: 2 },
          ]}
          placeholder="Seleccione un rol"
          register={register}
          required
          errors={errors}
        />
      </div>
    </div>
  );
};
