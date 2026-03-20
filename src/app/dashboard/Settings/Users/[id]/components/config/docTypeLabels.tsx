import { DocumentType } from "../../enums/DocumentType";

export const docTypeLabels: Record<DocumentType, string> = {
    [DocumentType.DniFront]: "DNI / NIE (Frontal)",
    [DocumentType.DniBack]: "DNI / NIE (Reverso)",
    [DocumentType.AeatCertificate]: "Certificado AEAT",
    [DocumentType.SsCertificate]: "Certificado Seguridad Social",
    [DocumentType.BankStatement]: "Extracto Bancario",
    [DocumentType.CifCertificate]: "Certificado CIF",
    [DocumentType.SignedContract]: "Contrato Firmado",
};