import { PersonType } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";
import { DocumentType } from "../../enums/DocumentType";

// Docs que el usuario debe tener verificados para poder solicitar su contrato (excluye SignedContract)
export const DOCS_REQUIRED_FOR_CONTRACT_REQUEST: Record<PersonType, DocumentType[]> = {
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

export const REQUIRED_DOCUMENTS_BY_PERSON_TYPE: Record<PersonType, DocumentType[]> = {
  [PersonType.Individual]: [
    DocumentType.DniFront,
    DocumentType.DniBack,
    DocumentType.AeatCertificate,
    DocumentType.SsCertificate,
    DocumentType.BankStatement,
    DocumentType.SignedContract,
  ],
  [PersonType.Company]: [
    DocumentType.DniFront,
    DocumentType.DniBack,
    DocumentType.AeatCertificate,
    DocumentType.SsCertificate,
    DocumentType.BankStatement,
    DocumentType.CifCertificate,
    DocumentType.SignedContract,
  ],
};