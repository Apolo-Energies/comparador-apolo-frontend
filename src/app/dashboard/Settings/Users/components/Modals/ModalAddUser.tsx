// ModalUser.tsx
import { useForm } from "react-hook-form";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/buttons/button";
import { ToggleGroup } from "@/components/buttons/ToggleGroup";
import { FormIndividualUser } from "../Formularios/FormIndividualUser";
import { COMPANY_FIELDS, INDIVIDUAL_FIELDS } from "../../interfaces/Fileds";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { registerUser } from "@/app/services/UserService/user.service";
import { useSession } from "next-auth/react";
import { FormUserCompany } from "../Formularios/FormCompanyUser";
import { CreateUserRequest } from "../../interfaces/CreateUserRequest";

interface Props {
  open: boolean;
  onClose: () => void;
}


export const ModalUser = ({ open, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<CreateUserRequest>({
    mode: "onChange",
    defaultValues: {
      personType: 0,
    },
  });

  const { data: session } = useSession();
  const { triggerReload } = useReloadStore();
  const { setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();

  const watchedValues = watch();
  const personType = watch("personType");

  const calculateProgress = () => {
    const relevantFields =
      personType === 0 ? INDIVIDUAL_FIELDS : COMPANY_FIELDS;

    const filled = relevantFields.filter((field) => {
      const value = watchedValues[field];
      return typeof value === "string"
        ? value.trim() !== ""
        : value !== undefined && value !== null;
    });

    return Math.round((filled.length / relevantFields.length) * 100);
  };

  const handlePersonTypeChange = (value: "Individual" | "Company") => {
    const type = value === "Individual" ? 0 : 1;
    setValue("personType", type);

    // Limpieza solo cuando pasas a persona física
    if (type === 0) {
      setValue("cif", "");
      setValue("companyName", "");
    }
  };

  const onSubmitFinal = async (data: CreateUserRequest) => {
    try {
      setLoading(true);

      const token = session?.user.token;
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await registerUser(token, data);

      if (response.isSuccess || response.status === 201) {
        showAlert("Se registró un usuario.", "success");
        reset();
        setValue("personType", personType);
        onClose();
        triggerReload();
      } else {
        showAlert("Error al registrar.", "error");
      }
    } catch (error) {
      showAlert("Error inesperado al registrar.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col h-[90vh] w-full max-w-xl">

        {/* Header */}
        <div className="shrink-0 px-4 pt-4 space-y-4">
          <Progress value={calculateProgress()} />

          <ToggleGroup
            value={personType === 0 ? "Individual" : "Company"}
            onValueChange={handlePersonTypeChange}
            options={[
              { value: "Individual", label: "Persona Física" },
              { value: "Company", label: "Persona Jurídica" },
            ]}
          />
        </div>

        {/* Título */}
        <div className="shrink-0 px-4 pt-4">
          <p className="text-lg font-semibold">Datos del usuario</p>
          <p className="text-sm text-muted-foreground">
            Complete los datos básicos del usuario
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmitFinal)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {personType === 0 ? (
              <FormIndividualUser
                register={register as any}
                errors={errors as any}
              />
            ) : (
              <FormUserCompany
                register={register as any}
                errors={errors as any}
              />
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-border px-4 py-3">
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>

              <Button type="submit" disabled={!isValid}>
                Crear usuario
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
