"use client";

import { BadgeCheck, MailCheck, TriangleAlert } from "lucide-react";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  previewUrl: string;
  allDocsVerified: boolean;
  hasSignatureRequest: boolean;
  isSigned: boolean;
  email: string;
  IS_MASTER: boolean;
  onRequestContract: () => Promise<void>;
}

export const ContractPreviewModal = ({
  open,
  onClose,
  previewUrl,
  allDocsVerified,
  hasSignatureRequest,
  isSigned,
  email,
  IS_MASTER,
  onRequestContract,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} className="max-w-6xl w-full">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold pr-6">Vista previa del contrato</p>

        <div className="h-[80vh] overflow-hidden rounded-xl border border-border bg-card/30">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="Vista previa del contrato"
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Vista previa no disponible
            </div>
          )}
        </div>

        {!IS_MASTER && (
          <div className="flex items-center justify-end border-t border-border pt-4">
            {isSigned ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 shrink-0 text-green-500" />
                <span>Ya tienes un contrato firmado.</span>
              </div>
            ) : hasSignatureRequest ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MailCheck className="h-4 w-4 shrink-0 text-green-500" />
                <span>
                  Ya has solicitado tu contrato. Revisa el correo{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                </span>
              </div>
            ) : allDocsVerified ? (
              <Button onClick={onRequestContract}>
                Solicitar contrato
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TriangleAlert className="h-4 w-4 shrink-0 text-yellow-500" />
                <span>
                  Tus documentos deben estar aprobados para poder solicitar el contrato.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
};
