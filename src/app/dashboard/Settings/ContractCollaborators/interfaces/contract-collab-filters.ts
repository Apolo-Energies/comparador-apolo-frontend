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
