"use client";

import React, { useMemo, useState } from "react";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/buttons/button";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useSession } from "next-auth/react";
import { sendContract } from "@/app/services/ContractService/contract.service";

interface Props {
    open: boolean;
    user: {
        id: string;
        email?: string;
        fullName?: string;
        customerId?: string;
    };
    onClose: () => void;
} 

export const ModalSendContract = ({ open, user, onClose }: Props) => {
    const { showAlert } = useAlertStore();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        const token = session?.user?.token;

        if (!user.customerId) {
            showAlert("No se pudo enviar: falta el CustomerId.", "error");
            return;
        }

        if (!token) {
            showAlert("No hay token de sesión. Vuelve a iniciar sesión.", "error");
            return;
        }

        setLoading(true);

        const resp = await sendContract(token, {
            customerId: user.customerId
        });

        setLoading(false);

        if (resp.isSuccess) {
            showAlert("Contrato enviado correctamente", "success");
            onClose();
        } else {
            showAlert(resp.displayMessage ?? "Error al enviar el contrato", "error");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className="px-4 pt-4 space-y-4">
                <h2 className="text-lg font-semibold">Enviar contrato</h2>

                <p className="text-sm text-muted-foreground">
                    Se enviará el contrato a:
                    <br />
                    <strong>{user.fullName ?? "Usuario"}</strong>
                    {user.email && (
                        <>
                            <br />
                            <strong>{user.email}</strong>
                        </>
                    )}
                </p>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button onClick={handleSend} disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
