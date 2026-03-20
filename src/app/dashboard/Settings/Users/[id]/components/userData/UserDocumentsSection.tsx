"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { DocumentList } from "../cards/DocumentList";
import { statusConfig } from "../config/statusConfig";
import { docTypeLabels } from "../config/docTypeLabels";
import { REQUIRED_DOCUMENTS_BY_PERSON_TYPE } from "../config/doc-by-person";

import { DocumentStatus } from "../../enums/DocumentStatus";
import { DocumentType } from "../../enums/DocumentType";

import { User, Document } from "../../../interfaces/user";
import { PersonType } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";

import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useAlertStore } from "@/app/store/ui/alert.store";

import {
    deleteContractDocument,
    rejectContractDocument,
    uploadContractDocument,
    validateContractDocument,
} from "@/app/services/ContractDocumentService/contract-document.service";

interface UserDocumentsSectionProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    IS_MASTER: boolean;
    personType: PersonType;
}

export const UserDocumentsSection = ({
    user,
    setUser,
    IS_MASTER,
    personType,
}: UserDocumentsSectionProps) => {
    const { data: session } = useSession();
    const { triggerReload } = useReloadStore();
    const { setLoading } = useLoadingStore();
    const { showAlert } = useAlertStore();

    const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);
    const [rejectObservation, setRejectObservation] = useState("");

    const handleVerify = async (documentId: string) => {
        const token = session?.user?.token;
        if (!token) {
            showAlert("No se encontró el token de autenticación.", "error");
            return;
        }

        const previousUser = user;

        setUser((prev) =>
            updateDocumentInUser(prev, documentId, (doc) => ({
                ...doc,
                status: DocumentStatus.Validated,
                reviewComment: null,
            }))
        );

        setRejectingDocId(null);
        setRejectObservation("");

        try {
            setLoading(true);

            const response = await validateContractDocument(token, documentId);

            if (response.isSuccess) {
                showAlert("Documento verificado correctamente.", "success");
                triggerReload();
            } else {
                setUser(previousUser);
                showAlert("No se pudo verificar el documento.", "error");
            }
        } catch (error) {
            setUser(previousUser);
            console.error(error);
            showAlert("Error inesperado al verificar el documento.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (documentId: string) => {
        if (rejectingDocId !== documentId) {
            setRejectingDocId(documentId);
            setRejectObservation("");
            return;
        }

        const observation = rejectObservation.trim();
        if (!observation) return;

        const token = session?.user?.token;
        if (!token) {
            showAlert("No se encontró el token de autenticación.", "error");
            return;
        }

        const previousUser = user;

        setUser((prev) =>
            updateDocumentInUser(prev, documentId, (doc) => ({
                ...doc,
                status: DocumentStatus.Rejected,
                reviewComment: observation.trim() ? observation : null,
            }))
        );

        setRejectingDocId(null);
        setRejectObservation("");

        try {
            setLoading(true);

            const response = await rejectContractDocument(
                token,
                documentId,
                observation
            );

            if (response.isSuccess) {
                showAlert("Documento rechazado correctamente.", "success");
                triggerReload();
            } else {
                setUser(previousUser);
                showAlert("No se pudo rechazar el documento.", "error");
            }
        } catch (error) {
            setUser(previousUser);
            console.error(error);
            showAlert("Error inesperado al rechazar el documento.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (documentId: string) => {
        const token = session?.user?.token;
        if (!token) {
            showAlert("No se encontró el token de autenticación.", "error");
            return;
        }

        const previousUser = user;

        setUser((prev) => removeDocumentFromUser(prev, documentId));

        if (rejectingDocId === documentId) {
            setRejectingDocId(null);
            setRejectObservation("");
        }

        try {
            setLoading(true);

            const response = await deleteContractDocument(token, documentId);

            if (response.isSuccess) {
                showAlert("Documento eliminado correctamente.", "success");
                triggerReload();
            } else {
                setUser(previousUser);
                showAlert("No se pudo eliminar el documento.", "error");
            }
        } catch (error) {
            setUser(previousUser);
            console.error(error);
            showAlert("Error inesperado al eliminar el documento.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file: File, documentType: DocumentType) => {
        const token = session?.user?.token;
        if (!token) {
            showAlert("No se encontró el token de autenticación.", "error");
            return;
        }

        const contractId = user?.contract?.id;
        if (!contractId) {
            showAlert("No se encontró el contrato del usuario.", "error");
            return;
        }

        const previousUser = user;

        const tempDocument: Document = {
            id: crypto.randomUUID(),
            contractId,
            documentType,
            status: DocumentStatus.Uploaded,
            fileUrl: URL.createObjectURL(file),
            reviewComment: null,
            reviewedAt: null,
            reviewedByUserId: null,
            createdAt: new Date(),
        };

        setUser((prev) => {
            if (!prev?.contract) return prev;

            return {
                ...prev,
                contract: {
                    ...prev.contract,
                    documents: [...(prev.contract.documents ?? []), tempDocument],
                },
            };
        });

        try {
            setLoading(true);

            const response = await uploadContractDocument(
                token,
                contractId,
                documentType,
                file
            );

            if (response.isSuccess) {
                showAlert(response.result || "Documento subido correctamente.", "success");
                triggerReload();
                return;
            }

            setUser(previousUser);
            showAlert(
                response.errorMessages?.[0] || "No se pudo subir el documento.",
                "error"
            );
        } catch (error) {
            setUser(previousUser);
            console.error(error);
            showAlert("Error inesperado al subir el documento.", "error");
        } finally {
            setLoading(false);
            URL.revokeObjectURL(tempDocument.fileUrl);
        }
    };

    const existingDocumentTypes = new Set<DocumentType>(
        (user?.contract?.documents ?? []).map(
            (doc) => doc.documentType as DocumentType
        )
    );

    const requiredDocuments =
        REQUIRED_DOCUMENTS_BY_PERSON_TYPE[personType] ?? [];

    const availableDocumentTypes = requiredDocuments.filter(
        (documentType: DocumentType) => !existingDocumentTypes.has(documentType)
    );

    const availableDocTypeLabels: Partial<Record<DocumentType, string>> =
        availableDocumentTypes.reduce(
            (acc, documentType) => {
                acc[documentType] = docTypeLabels[documentType];
                return acc;
            },
            {} as Partial<Record<DocumentType, string>>
        );

    return (
        <DocumentList
            documents={user?.contract?.documents ?? []}
            IS_MASTER={IS_MASTER}
            rejectingDocId={rejectingDocId}
            rejectObservation={rejectObservation}
            setRejectObservation={setRejectObservation}
            handleVerify={handleVerify}
            handleReject={handleReject}
            handleDelete={handleDelete}
            handleUpload={handleUpload}
            statusConfig={statusConfig}
            docTypeLabels={docTypeLabels}
            availableDocTypeLabels={availableDocTypeLabels}
        />
    );
};

function updateDocumentInUser(
    prev: User | null,
    documentId: string,
    updateFn: (doc: Document) => Document
): User | null {
    if (!prev?.contract?.documents) return prev;

    return {
        ...prev,
        contract: {
            ...prev.contract,
            documents: prev.contract.documents.map((doc) =>
                doc.id === documentId ? updateFn(doc) : doc
            ),
        },
    };
}

function removeDocumentFromUser(
    prev: User | null,
    documentId: string
): User | null {
    if (!prev?.contract?.documents) return prev;

    return {
        ...prev,
        contract: {
            ...prev.contract,
            documents: prev.contract.documents.filter(
                (doc) => doc.id !== documentId
            ),
        },
    };
}