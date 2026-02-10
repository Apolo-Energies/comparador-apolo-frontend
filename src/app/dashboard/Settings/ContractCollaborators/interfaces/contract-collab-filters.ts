export interface ContractFilters {
    fullName?: string;
    dni?: string;
    email?: string;
    personType?: PersonType;
    isActive?: boolean;
    startDateFrom?: string;
    startDateTo?: string;
    page?: number;
    pageSize?: number;
}


export enum PersonType {
    Individual = "Individual",
    Company = "Company",
}


export interface SendContractRequest {
    customerId: string;
    subject?: string;
    message?: string;
}

export interface SendContractResult {
    requestId: string;
    signingUrl: string | null;
}