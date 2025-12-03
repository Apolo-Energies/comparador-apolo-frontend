"use client";

import React from "react";
import { Input } from "@/components/Inputs/Input";
import { DelegacionCuentaBancaria } from "@/types/DelegacionCuentaBancaria";
import { DelegacionInformacionBasica } from "@/types/DelegacionInfoBasica";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type CombinedForm = DelegacionCuentaBancaria & DelegacionInformacionBasica;

interface Props {
  register: UseFormRegister<CombinedForm>;
  errors: FieldErrors<CombinedForm>;
}

export const FormCuentaBancaria = ({ register, errors }: Props) => {
  return (
    <div className="space-y-2">
      <p className="text-xs mx-0 mb-2">
        Configure la información bancaria de la delegación
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Código Cuenta"
          name="codigoCuenta"
          placeholder="ES12 3456 7890 1234 5678 9012"
          register={register}
          required
          errors={errors}
        />
        <Input
          label="Identificador Acreedor"
          name="identificadorAcreedor"
          placeholder="ES12 3456 7890 1234 5678 9012"
          register={register}
          required
          errors={errors}
        />
      </div>

      <Input
        label="Cod. ERP"
        name="codigoErp"
        placeholder="Código ERP"
        register={register}
        required
        errors={errors}
      />

      <div className="flex items-start gap-3 bg-info-bg border border-info-border rounded-[12px] px-4 py-4">
        <div className="w-3 h-3 mt-1 rounded-full bg-info-dot" />
        <div>
          <p className="font-semibold text-sm text-info-title">
            Información adicional
          </p>
          <p className="text-sm text-info-subtext">
            Complete todos los campos de cuenta bancaria.
          </p>
        </div>
      </div>
    </div>
  );
};
