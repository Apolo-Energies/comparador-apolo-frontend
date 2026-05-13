"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ModalDeleteUser = ({ open, userName, onConfirm, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} className="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="space-y-1 pr-6">
            <p className="text-base font-semibold text-foreground">
              ¿Estás seguro de querer eliminar a {userName}?
            </p>
            <p className="text-sm text-muted-foreground">
              Al eliminar este usuario se eliminarán todos sus datos: comparaciones, contratos y documentos del registro. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button variant="outline" className="cursor-pointer" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" className="cursor-pointer" onClick={onConfirm}>
            Eliminar usuario
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
