import { SignatureStatusMap } from "./signatureStatus";

export const getSignatureStatusLabel = (
    status?: number | null
): string => {
    if (status === null || status === undefined) {
        return "Sin estado";
    }

    return SignatureStatusMap[status] ?? "Desconocido";
};
