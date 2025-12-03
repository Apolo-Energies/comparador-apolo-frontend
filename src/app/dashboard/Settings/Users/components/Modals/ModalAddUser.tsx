import React from 'react'
import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/user';
import { Dialog } from '@/components/Dialogs/Dialog';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/buttons/button';
import { FormUser } from '../Formularios/FormUser';
import { useSession } from 'next-auth/react';
import { registerUser } from '@/app/services/UserService/user.service';
import { useReloadStore } from '@/app/store/reloadData/reloadFlag.store';
import { useLoadingStore } from '@/app/store/ui/loading.store';
import { useAlertStore } from '@/app/store/ui/alert.store';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalUser = ({open, onClose}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<User>({
  });
  const { data: session } = useSession();
  const {triggerReload} = useReloadStore();
  const {setLoading} = useLoadingStore();
  const {showAlert} = useAlertStore();

  const watchedValues = watch();

  const calculateProgress = () => {
    const values = watchedValues;
    const filled = Object.values(values).filter(
      (v) => typeof v === "string" && v.trim() !== ""
    );
    const total = Object.keys(values).length;
    return Math.round((filled.length / total) * 100);
  };

  const onSubmitFinal = async (data: User) => {
  
    try {
      setLoading(true);
      const token = session?.user.token;
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }
      const response = await registerUser(token, data);

      if (response.status === 200 || response.status === 201) {
        showAlert("Se registro un usuario. ", "success");
        reset();
        onClose();
        triggerReload();
      } else {
        showAlert("Error al registrar. ", "error");
      }
    } catch (error) {
      showAlert("Error al inesperado al registrar. ", "error");
      console.error("Error inesperado:", error);
    } finally{
      setLoading(true);
    }
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

      <form
        onSubmit={handleSubmit(onSubmitFinal)}
        className="space-y-4 max-h-96 overflow-y-auto px-4 py-4"
      >
      <FormUser register={register} errors={errors} />
        
      </form>

      <div className="sticky bottom-0 px-4 ">
        <div className="border-t border-border py-3 flex items-center justify-between">
          <Button variant="outline" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onSubmitFinal)} disabled={!isValid}>
            Crear usuario
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
