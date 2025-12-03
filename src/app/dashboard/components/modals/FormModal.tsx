"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/buttons/button";
import { ToggleGroup } from "@/components/buttons/ToggleGroup";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Progress } from "@/components/ui/Progress";
import { DelegacionInformacionBasica } from "@/types/DelegacionInfoBasica";
import { DelegacionCuentaBancaria } from "@/types/DelegacionCuentaBancaria";
import { FormInfoBasica } from "../formularios/FormInfoBasica";
import { FormCuentaBancaria } from "../formularios/FormCuentaBancaria";

type FormStep = "informacion-basica" | "cuenta-bancaria";

interface Props {
  open: boolean;
  onClose: () => void;
}

type FormData = DelegacionInformacionBasica & DelegacionCuentaBancaria;

export function FormModal({ open, onClose }: Props) {
  const [view, setView] = useState<FormStep>("informacion-basica");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      cif: "",
      razonSocial: "",
      direccion: "",
      codigoPostal: "",
      provincia: "",
      poblacion: "",
      telefono: "",
      correoElectronico: "",
      codigoErp: "",
      codigoCuenta: "",
      identificadorAcreedor: "",
    },
  });

  const watchedValues = watch();

  const calculateProgress = () => {
    const values = watchedValues; // ahora con watch
    const filled = Object.values(values).filter(
      (v) => typeof v === "string" && v.trim() !== ""
    );
    const total = Object.keys(values).length;
    return Math.round((filled.length / total) * 100);
  };

  const handleViewChange = async (step: FormStep) => {
    const isStepValid = await trigger(); // Valida campos actuales
    if (!isStepValid) return;
    setView(step);
  };

  const onSubmitFinal = (/*data: FormData*/) => {
    reset();
    onClose();
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="space-y-2 px-4 pt-4">
        <div className="flex justify-between text-sm">
          <span>Progreso</span>
          <span>{calculateProgress()}%</span>
        </div>
        <Progress value={calculateProgress()} />
      </div>

      <div className="px-4 pt-2">
        <ToggleGroup
          value={view}
          onValueChange={handleViewChange}
          options={[
            { value: "informacion-basica", label: "Información Básica" },
            { value: "cuenta-bancaria", label: "Cuenta Bancaria" },
          ]}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmitFinal)}
        className="space-y-4 max-h-96 overflow-y-auto px-4 py-4"
      >
        {view === "informacion-basica" ? (
          <FormInfoBasica register={register} errors={errors} />
        ) : (
          <FormCuentaBancaria register={register} errors={errors} />
        )}
      </form>

      <div className="sticky bottom-0 px-4 ">
        <div className="border-t border-border py-3 flex items-center justify-between">
          <Button variant="outline" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onSubmitFinal)} disabled={!isValid}>
            Crear delegación
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
