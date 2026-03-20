import { Dialog } from "@/components/Dialogs/Dialog";
import { Document } from "../../../interfaces/user";
import { StatusConfigItem } from "../cards/DocumentList";
import { Badge } from "@/components/badge/Badge";

interface Props {
    open: boolean;
    onClose: () => void;
    document: Document | null;
    statusConfig: Record<number, StatusConfigItem>;
    docTypeLabels: Record<number, string>;
}

export const DocumentViewerModal = ({ ...props }: Props) => {
    if (!props.document) return null;

    const { document } = props;

    const config = props.statusConfig[document.status];
    const StatusIcon = config.icon;

    const documentType =
        props.docTypeLabels[document.documentType] ??
        `Documento ${document.documentType}`;

    const uploadDate = new Date(document.createdAt).toLocaleDateString("es-ES");

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            className="max-w-[90vw] overflow-hidden p-0"
        >
            <div className="flex w-full flex-col">

                <div className="shrink-0 border-b border-border px-6 py-3">
                    <p className="text-lg font-semibold text-foreground">
                        {documentType}
                    </p>

                    <div className="space-y-1 mt-2">

                        <div className="flex items-center justify-between px-1 py-1">
                            <span className="text-sm text-muted-foreground">Tipo</span>
                            <span className="text-sm font-medium text-foreground">
                                {documentType}
                            </span>
                        </div>

                        <div className="flex items-center justify-between px-1 py-1">
                            <span className="text-sm text-muted-foreground">
                                Fecha de subida
                            </span>
                            <span className="text-sm font-medium text-foreground">
                                {uploadDate}
                            </span>
                        </div>

                        <div className="flex items-center justify-between px-1 py-1">
                            <span className="text-sm text-muted-foreground">Estado</span>

                            <Badge variant={config.variant} className="gap-2">
                                <StatusIcon className="h-4 w-4" />
                                {config.label}
                            </Badge>
                        </div>

                    </div>
                </div>

                <div className="space-y-4 px-3 py-3">

                    {document.reviewComment && (
                        <div
                            className="rounded-xl px-2 py-2 text-sm"
                            style={{
                                backgroundColor: "var(--color-alert-rejected-bg)",
                                color: "var(--color-alert-rejected-text)",
                            }}
                        >
                            <span className="font-medium">Observación:</span>{" "}
                            {document.reviewComment}
                        </div>
                    )}

                    <div className="h-[70vh] overflow-hidden rounded-2xl border border-border bg-card/30">
                        {document.previewUrl ? (
                            <iframe
                                src={document.previewUrl}
                                title="Vista previa del documento"
                                className="h-full w-full"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                Vista previa no disponible
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </Dialog>
    );
};