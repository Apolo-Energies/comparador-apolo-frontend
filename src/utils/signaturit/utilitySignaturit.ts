import { SignatureStatusMap } from "./signatureStatus";

export const getSignatureStatusLabel = (
    status?: number | null
): string => {
    if (status === null || status === undefined) {
        return "Sin contrato";
    }

    return SignatureStatusMap[status] ?? "Desconocido";
};
