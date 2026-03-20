"use client";

import { Eye, FileText, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/badge/Badge";
import { Document } from "../../../interfaces/user";
import { DocumentStatus } from "../../enums/DocumentStatus";
import { StatusConfigItem } from "./DocumentList";

interface DocumentRowProps {
    doc: Document;
    IS_MASTER: boolean;
    rejectingDocId: string | null;
    rejectObservation: string;
    setRejectObservation: (value: string) => void;
    handleVerify: (id: string) => void;
    handleReject: (id: string) => void;
    handleDelete: (id: string) => void;
    statusConfig: Record<number, StatusConfigItem>;
    docTypeLabels: Record<number, string>;
    onViewDocument: (doc: Document) => void;
}

export const DocumentRow = ({...props}: DocumentRowProps) => {
    const config = props.statusConfig[props.doc.status];
    if (!config) return null;

    const StatusIcon = config.icon;
    const isRejecting = props.rejectingDocId === props.doc.id;

    const showRejectedObservation =
        props.doc.status === DocumentStatus.Rejected &&
        !!props.doc.reviewComment &&
        !isRejecting;

    const canManage =
        props.IS_MASTER &&
        props.doc.status !== DocumentStatus.Validated &&
        props.doc.status !== DocumentStatus.Rejected &&
        props.doc.status !== DocumentStatus.Signed;

    return (
        <div className="space-y-3">

            {/* ROW */}
            <div className="bg-body p-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    {/* LEFT */}
                    <div className="flex min-w-0 items-start gap-3">
                        <FileText className="h-7 w-7 shrink-0 text-slate-400" />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[16px] font-medium text-white">
                                {props.docTypeLabels[props.doc.documentType] ?? `Documento ${props.doc.documentType}`}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                {props.docTypeLabels[props.doc.documentType] ?? `Tipo ${props.doc.documentType}`} ·{" "}
                                Subido {new Date(props.doc.createdAt).toLocaleDateString("es-ES")}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap items-center gap-2">

                        <Badge variant={config.variant} className="gap-1 shrink-0">
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                        </Badge>

                        {canManage && (
                            <>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="h-7 text-xs cursor-pointer"
                                    onClick={() => props.handleVerify(props.doc.id)}
                                >
                                    Aprobar
                                </Button>

                                <Button
                                    variant="dangerSoft"
                                    size="sm"
                                    className="h-7 text-xs cursor-pointer"
                                    onClick={() => props.handleReject(props.doc.id)}
                                >
                                    Rechazar
                                </Button>
                            </>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs gap-1 cursor-pointer"
                            onClick={() => props.onViewDocument(props.doc)}
                        >
                            <Eye className="h-3 w-3" />
                            Ver
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
                            onClick={() => props.handleDelete(props.doc.id)}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>

                    </div>
                </div>
            </div>

            {props.IS_MASTER && isRejecting && (
                <div className="ml-8 mr-3 mb-2 flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribe la observación del rechazo..."
                        value={props.rejectObservation}
                        onChange={(e) => props.setRejectObservation(e.target.value)}
                        autoFocus
                        className="flex-1 px-2 py-1.5 text-sm bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-destructive"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") props.handleReject(props.doc.id);
                        }}
                    />

                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 cursor-pointer"
                        onClick={() => props.handleReject(props.doc.id)}
                        disabled={!props.rejectObservation.trim()}
                    >
                        <Send className="h-3 w-3" />
                    </Button>
                </div>
            )}

            {showRejectedObservation && (
                <div
                    className="ml-8 mr-3 mb-2 rounded-md px-3 py-2 text-sm"
                    style={{
                        backgroundColor: "var(--color-alert-rejected-bg)",
                        color: "var(--color-alert-rejected-text)",
                    }}
                >
                    <span className="font-medium">Observación:</span> {props.doc.reviewComment}
                </div>
            )}
        </div>
    );
};