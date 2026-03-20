"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/buttons/ToggleGroup";
import { Input } from "@/components/Inputs/Input";

import { PersonType } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";
import { User } from "../../../interfaces/user";

import { createCustomer, updateCustomer } from "@/app/services/Customer/customer.service";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useLoadingStore } from "@/app/store/ui/loading.store";

type CustomerModalMode = "create" | "edit";

interface CustomerForm {
    id?: string;
    userId?: string;
    kind: number;
    personType: PersonType;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    legalAddress: string;
    notificationAddress: string;
    bankAccount: string;
    dni: string;
    cif: string;
    companyName: string;
}

interface CustomerModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
    mode: CustomerModalMode;
}

export const CustomerModal = ({
    open,
    onClose,
    user,
    mode,
}: CustomerModalProps) => {
    const { data: session } = useSession();
    const { setLoading } = useLoadingStore();
    const { showAlert } = useAlertStore();
    const { triggerReload } = useReloadStore();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<CustomerForm>({
        mode: "onChange",
        defaultValues: {
            id: "",
            userId: "",
            kind: 0,
            personType: 0 as PersonType,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            legalAddress: "",
            notificationAddress: "",
            bankAccount: "",
            dni: "",
            cif: "",
            companyName: "",
        },
    });

    const personType = watch("personType");
    const isEditMode = mode === "edit";

    useEffect(() => {
        if (!open || !user) return;

        reset({
            id: user.customer?.id ?? "",
            userId: user.id ?? "",
            kind: user.customer?.kind ?? 0,
            personType: (user.customer?.personType ?? 0) as PersonType,
            firstName: user.customer?.firstName ?? "",
            lastName: user.customer?.lastName ?? "",
            email: user.customer?.email ?? user.email ?? "",
            phone: user.customer?.phone ?? user.phone ?? "",
            legalAddress: user.customer?.legalAddress ?? "",
            notificationAddress: user.customer?.notificationAddress ?? "",
            bankAccount: user.customer?.bankAccount ?? "",
            dni: user.customer?.dni ?? "",
            cif: user.customer?.cif ?? "",
            companyName: user.customer?.companyName ?? "",
        });
    }, [open, user, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const handlePersonTypeChange = (value: "Individual" | "Company") => {
        if (isEditMode) return;

        const nextType = (value === "Individual" ? 0 : 1) as PersonType;
        setValue("personType", nextType, { shouldValidate: true });

        if (nextType === 0) {
            setValue("cif", "", { shouldValidate: true });
            setValue("companyName", "", { shouldValidate: true });
        } else {
            setValue("firstName", "", { shouldValidate: true });
            setValue("lastName", "", { shouldValidate: true });
            setValue("dni", "", { shouldValidate: true });
        }
    };

    const onSubmitForm = async (data: CustomerForm) => {
        try {
            setLoading(true);

            const token = session?.user?.token;
            if (!token) {
                throw new Error("No se encontró el token de autenticación.");
            }

            if (mode === "create") {
                const response = await createCustomer(token, {
                    kind: data.kind,
                    personType: data.personType,
                    firstName: data.personType === 0 ? data.firstName : "",
                    lastName: data.personType === 0 ? data.lastName : "",
                    email: data.email,
                    phone: data.phone,
                    legalAddress: data.legalAddress,
                    notificationAddress: data.notificationAddress,
                    bankAccount: data.bankAccount,
                    dni: data.personType === 0 ? data.dni : "",
                    cif: data.personType === 1 ? data.cif : "",
                    companyName: data.personType === 1 ? data.companyName : "",
                });

                if (response.isSuccess) {
                    showAlert("Datos personales creados correctamente.", "success");
                    triggerReload();
                    handleClose();
                } else {
                    showAlert(
                        response.errorMessages?.[0] ||
                        "No se pudieron crear los datos personales.",
                        "error"
                    );
                }

                return;
            }

            const response = await updateCustomer(token, {
                id: data.id ?? "",
                userId: data.userId ?? user?.id ?? "",
                kind: data.kind,
                personType: data.personType,
                firstName: data.personType === 0 ? data.firstName : "",
                lastName: data.personType === 0 ? data.lastName : "",
                email: data.email,
                phone: data.phone,
                legalAddress: data.legalAddress,
                notificationAddress: data.notificationAddress,
                bankAccount: data.bankAccount,
                dni: data.personType === 0 ? data.dni : "",
                cif: data.personType === 1 ? data.cif : "",
                companyName: data.personType === 1 ? data.companyName : "",
            });

            if (response.isSuccess) {
                showAlert("Datos personales actualizados correctamente.", "success");
                triggerReload();
                handleClose();
            } else {
                showAlert(
                    response.errorMessages?.[0] ||
                    "No se pudieron actualizar los datos personales.",
                    "error"
                );
            }
        } catch (error) {
            console.error(error);
            showAlert("Error inesperado al guardar los datos personales.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="flex w-full max-w-2xl flex-col">
                <div className="shrink-0 space-y-4 border-b border-border px-4 py-4">
                    <div>
                        <p className="text-lg font-semibold">
                            {mode === "create"
                                ? "Agregar datos personales"
                                : "Editar datos personales"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Completa o actualiza la información del cliente
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                            Tipo de persona
                        </p>

                        <ToggleGroup
                            value={personType === 0 ? "Individual" : "Company"}
                            onValueChange={handlePersonTypeChange}
                            options={[
                                { value: "Individual", label: "Persona Física" },
                                { value: "Company", label: "Persona Jurídica" },
                            ]}
                        />

                        {isEditMode && (
                            <p className="text-xs text-muted-foreground">
                                El tipo de persona no se puede modificar al editar.
                            </p>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
                    <div className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-2">
                        {personType === 0 ? (
                            <>
                                <Input<CustomerForm>
                                    label="Nombre"
                                    name="firstName"
                                    required
                                    register={register("firstName", {
                                        required: "El nombre es obligatorio",
                                        maxLength: {
                                            value: 50,
                                            message: "Máximo 50 caracteres",
                                        },
                                    })}
                                    errors={errors}
                                />

                                <Input<CustomerForm>
                                    label="Apellidos"
                                    name="lastName"
                                    required
                                    register={register("lastName", {
                                        required: "Los apellidos son obligatorios",
                                        maxLength: {
                                            value: 100,
                                            message: "Máximo 100 caracteres",
                                        },
                                    })}
                                    errors={errors}
                                />

                                <div className="md:col-span-2">
                                    <Input<CustomerForm>
                                        label="DNI / NIE"
                                        name="dni"
                                        required
                                        register={register("dni", {
                                            required: "El DNI / NIE es obligatorio",
                                            maxLength: {
                                                value: 20,
                                                message: "Máximo 20 caracteres",
                                            },
                                        })}
                                        errors={errors}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="md:col-span-2">
                                    <Input<CustomerForm>
                                        label="Razón social"
                                        name="companyName"
                                        required
                                        register={register("companyName", {
                                            required: "La razón social es obligatoria",
                                            maxLength: {
                                                value: 150,
                                                message: "Máximo 150 caracteres",
                                            },
                                        })}
                                        errors={errors}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Input<CustomerForm>
                                        label="CIF"
                                        name="cif"
                                        required
                                        register={register("cif", {
                                            required: "El CIF es obligatorio",
                                            maxLength: {
                                                value: 30,
                                                message: "Máximo 30 caracteres",
                                            },
                                        })}
                                        errors={errors}
                                    />
                                </div>
                            </>
                        )}

                        <Input<CustomerForm>
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

                        <Input<CustomerForm>
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

                        <div className="md:col-span-2">
                            <Input<CustomerForm>
                                label="Dirección legal"
                                name="legalAddress"
                                required
                                register={register("legalAddress", {
                                    required: "La dirección legal es obligatoria",
                                    maxLength: {
                                        value: 200,
                                        message: "Máximo 200 caracteres",
                                    },
                                })}
                                errors={errors}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input<CustomerForm>
                                label="Dirección de notificación"
                                name="notificationAddress"
                                required
                                register={register("notificationAddress", {
                                    required: "La dirección de notificación es obligatoria",
                                    maxLength: {
                                        value: 200,
                                        message: "Máximo 200 caracteres",
                                    },
                                })}
                                errors={errors}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input<CustomerForm>
                                label="Cuenta bancaria"
                                name="bankAccount"
                                required
                                register={register("bankAccount", {
                                    required: "La cuenta bancaria es obligatoria",
                                    maxLength: {
                                        value: 50,
                                        message: "Máximo 50 caracteres",
                                    },
                                })}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="shrink-0 border-t border-border px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button type="submit" disabled={!isValid}>
                                {mode === "create" ? "Guardar datos" : "Actualizar datos"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};