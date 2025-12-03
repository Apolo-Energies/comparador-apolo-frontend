"use client";

import { Input } from "@/components/Inputs/Input";
import { DelegacionCuentaBancaria } from "@/types/DelegacionCuentaBancaria";
import { DelegacionInformacionBasica} from "@/types/DelegacionInfoBasica";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type CombinedForm = DelegacionInformacionBasica & DelegacionCuentaBancaria;

interface Props {
  register: UseFormRegister<CombinedForm>;
  errors: FieldErrors<CombinedForm>;
}

export const FormInfoBasica = ({ register, errors }: Props) => {
  return (
    <div className="space-y-2">
      <p className="text-xs mx-0 mb-2">Complete los datos básicos de la delegación</p>

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Nombre"
          name="nombre"
          placeholder="Nombre de la delegación"
          register={register}
          required
          errors={errors}
        />
        <Input
          label="CIF"
          name="cif"
          placeholder="A12345678"
          register={register}
          required
          errors={errors}
        />
      </div>

      <Input
        label="Razón social"
        name="razonSocial"
        placeholder="Razón social completa"
        register={register}
        required
        errors={errors}
      />

      <Input
        label="Dirección"
        name="direccion"
        placeholder="Calle, número, piso, puerta"
        register={register}
        required
        errors={errors}
      />

      <div className="grid grid-cols-3 gap-2">
        <Input
          label="Código Postal"
          name="codigoPostal"
          placeholder="28001"
          register={register}
          required
          errors={errors}
        />
        <Input
          label="Provincia"
          name="provincia"
          placeholder="Madrid"
          register={register}
          required
          errors={errors}
        />
        <Input
          label="Población"
          name="poblacion"
          placeholder="Madrid"
          register={register}
          required
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Teléfono"
          name="telefono"
          placeholder="600123456"
          register={register}
          required
          errors={errors}
        />
        <Input
          label="Correo Electrónico"
          name="correoElectronico"
          type="email"
          placeholder="contacto@ejemplo.com"
          register={register}
          required
          errors={errors}
        />
      </div>
    </div>
  );
};
