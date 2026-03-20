"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/badge/Badge";

import { Document } from "../../../interfaces/user";
import { DocumentRow } from "./DocumentRow";
import { DocumentViewerModal } from "../modals/DocumentViewerModal";
import { DocumentUploadModal } from "../modals/DocumentUploadModal";
import { DocumentType } from "../../enums/DocumentType";

export interface StatusConfigItem {
    icon: React.ComponentType<{ className?: string }>;
    variant: React.ComponentProps<typeof Badge>["variant"];
    label: string;
}

interface DocumentListProps {
    documents: Document[];
    IS_MASTER: boolean;
    rejectingDocId: string | null;
    rejectObservation: string;
    setRejectObservation: (value: string) => void;
    handleVerify: (id: string) => void;
    handleReject: (id: string) => void;
    handleDelete: (id: string) => void;
    handleUpload: (
        file: File,
        documentType: DocumentType
    ) => Promise<void> | void;
    statusConfig: Record<number, StatusConfigItem>;
    docTypeLabels: Record<DocumentType, string>;
    availableDocTypeLabels: Partial<Record<DocumentType, string>>;
}

export const DocumentList = ({
    documents,
    IS_MASTER,
    rejectingDocId,
    rejectObservation,
    setRejectObservation,
    handleVerify,
    handleReject,
    handleDelete,
    handleUpload,
    statusConfig,
    docTypeLabels,
    availableDocTypeLabels,
}: DocumentListProps) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [viewerDoc, setViewerDoc] = useState<Document | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onSubmitUpload = async (
        file: File,
        documentType: DocumentType
    ) => {
        try {
            setIsUploading(true);
            await handleUpload(file, documentType);
            setShowUploadModal(false);
        } finally {
            setIsUploading(false);
        }
    };

    const hasAvailableDocumentsToUpload =
        Object.keys(availableDocTypeLabels).length > 0;

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-3 text-[18px] font-semibold text-foreground">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        Documentación
                    </p>

                    {hasAvailableDocumentsToUpload && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 cursor-pointer gap-2 px-4 text-xs"
                            onClick={() => setShowUploadModal(true)}
                        >
                            <Plus className="h-3 w-3" />
                            Subir Documento
                        </Button>
                    )}
                </div>

                {documents.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                        No hay documentos registrados
                    </p>
                ) : (
                    <div className="space-y-3">
                        {documents.map((doc) => (
                            <DocumentRow
                                key={doc.id}
                                doc={doc}
                                IS_MASTER={IS_MASTER}
                                rejectingDocId={rejectingDocId}
                                rejectObservation={rejectObservation}
                                setRejectObservation={setRejectObservation}
                                handleVerify={handleVerify}
                                handleReject={handleReject}
                                handleDelete={handleDelete}
                                statusConfig={statusConfig}
                                docTypeLabels={docTypeLabels}
                                onViewDocument={setViewerDoc}
                            />
                        ))}
                    </div>
                )}
            </div>

            <DocumentUploadModal
                open={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onSubmit={onSubmitUpload}
                isUploading={isUploading}
                docTypeLabels={availableDocTypeLabels}
            />

            <DocumentViewerModal
                open={!!viewerDoc}
                onClose={() => setViewerDoc(null)}
                document={viewerDoc}
                statusConfig={statusConfig}
                docTypeLabels={docTypeLabels}
            />
        </>
    );
};