import { PersonType } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";
import { DocumentType } from "../../enums/DocumentType";

export const REQUIRED_DOCUMENTS_BY_PERSON_TYPE: Record<PersonType, DocumentType[]> = {
  [PersonType.Individual]: [
    DocumentType.DniFront,
    DocumentType.DniBack,
    DocumentType.AeatCertificate,
    DocumentType.SsCertificate,
    DocumentType.BankStatement,
  ],
  [PersonType.Company]: [
    DocumentType.DniFront,
    DocumentType.DniBack,
    DocumentType.AeatCertificate,
    DocumentType.SsCertificate,
    DocumentType.BankStatement,
    DocumentType.CifCertificate,
  ],
};