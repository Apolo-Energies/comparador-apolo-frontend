"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/buttons/button";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { forgotPassword } from "@/app/services/ApiAuth/auth.service";

interface Props {
    open: boolean;
    user: { email: string };
    onClose: () => void;
}

export const ModalRestorePassword = ({ open, user, onClose }: Props) => {
    const { showAlert } = useAlertStore();
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setLoading(true);

        const resp = await forgotPassword(user.email);

        setLoading(false);

        if (resp.isSuccess) {
            showAlert(
                `Se envió un email de restablecimiento a ${user.email}`,
                "success"
            );
            onClose();
        } else {
            showAlert(resp.displayMessage ?? "Error al enviar el correo", "error");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className="px-4 pt-4 space-y-4">
                <h2 className="text-lg font-semibold">Restablecer contraseña</h2>

                <p className="text-sm text-muted-foreground">
                    ¿Quieres enviar un correo de recuperación a:
                    <br />
                    <strong>{user.email}</strong>?
                </p>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button onClick={handleSend} disabled={loading}>
                        {loading ? "Enviando..." : "Enviar correo"}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
