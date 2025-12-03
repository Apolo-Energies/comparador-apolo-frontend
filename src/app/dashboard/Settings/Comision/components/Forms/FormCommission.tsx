import React from 'react'
import { Input } from '@/components/Inputs/Input';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Commission } from '../../interfaces/commission';

interface Props {
  register: UseFormRegister<Commission>;
  errors: FieldErrors<Commission>;
  defaultValues?: Partial<Commission>;
}

export const FormCommission = ({ register, errors, defaultValues }: Props) => {
  return (
    <div className="space-y-2">
      <p className="text-xs mx-0 mb-2">
        Complete los datos básicos del usuario
      </p>
      <div className="grid grid-cols-1 gap-2">
        <Input
          label="Nombre Comisión"
          name="name"
          placeholder="Oro"
          register={register}
          required
          errors={errors}
          defaultValue={defaultValues?.name}
        />

        <Input
          type='number'
          label="Porcentaje"
          name="percentage"
          placeholder="30"
          register={register}
          required
          errors={errors}
          defaultValue={defaultValues?.percentage}
        />
      </div>
    </div>
  );
}