"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Inputs/Input";

import { User } from "../../../interfaces/user";

import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { updateUser } from "@/app/services/UserService/user.service";

interface EditUserForm {
    id: string;
    fullName: string;
    email: string;
    phone: string;
}

interface EditUserModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

export const EditUserModal = ({
    open,
    onClose,
    user,
}: EditUserModalProps) => {
    const { data: session } = useSession();
    const { setLoading } = useLoadingStore();
    const { showAlert } = useAlertStore();
    const { triggerReload } = useReloadStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<EditUserForm>({
        mode: "onChange",
        defaultValues: {
            id: "",
            fullName: "",
            email: "",
            phone: "",
        },
    });

    useEffect(() => {
        if (!open || !user) return;

        reset({
            id: user.id,
            fullName: user.fullName ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
        });
    }, [open, user, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmitForm = async (data: EditUserForm) => {
        try {
            setLoading(true);

            const token = session?.user?.token;
            if (!token) {
                throw new Error("No se encontró el token de autenticación.");
            }

            const response = await updateUser(token, data.id, {
                fullName: data.fullName, email: data.email
            });

            if (response.isSuccess) {
                showAlert("Usuario actualizado correctamente.", "success");
                triggerReload();
                handleClose();
            } else {
                showAlert(
                    response.errorMessages?.[0] || "No se pudo actualizar el usuario.",
                    "error"
                );
            }
        } catch (error) {
            console.error(error);
            showAlert("Error inesperado al actualizar el usuario.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="flex w-full max-w-xl flex-col">
                <div className="shrink-0 border-b border-border px-4 py-4">
                    <p className="text-lg font-semibold">Editar usuario</p>
                    <p className="text-sm text-muted-foreground">
                        Actualiza los datos básicos del usuario
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
                    <div className="space-y-4 px-4 py-4">
                        <Input<EditUserForm>
                            label="Nombre completo"
                            name="fullName"
                            required
                            register={register("fullName", {
                                required: "El nombre completo es obligatorio",
                                maxLength: {
                                    value: 100,
                                    message: "Máximo 100 caracteres",
                                },
                            })}
                            errors={errors}
                        />

                        <Input<EditUserForm>
                            label="Correo"
                            name="email"
                            required
                            type="email"
                            register={register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Correo inválido",
                                },
                            })}
                            errors={errors}
                            readOnly
                        />

                        <Input<EditUserForm>
                            label="Teléfono"
                            name="phone"
                            required
                            register={register("phone", {
                                required: "El teléfono es obligatorio",
                                maxLength: {
                                    value: 20,
                                    message: "Máximo 20 caracteres",
                                },
                            })}
                            errors={errors}
                        />
                    </div>

                    <div className="shrink-0 border-t border-border px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button type="submit" disabled={!isValid}>
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};