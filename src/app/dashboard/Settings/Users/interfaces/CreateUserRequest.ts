// Individual
export interface CreateIndividualUserRequest {
    personType: 0;
    email: string;
    role: number;
    name: string;
    surnames: string;
    dni: string;
    phone?: string;
    legalAddress?: string;
    notificationAddress?: string;
    bankAccount?: string;
}

// Company
export interface CreateCompanyUserRequest {
    personType: 1;
    email: string;
    role: number;
    name: string;
    surnames: string;
    dni: string;
    cif: string;
    companyName: string;
    phone?: string;
    legalAddress?: string;
    notificationAddress?: string;
    bankAccount?: string;
}

// Union type for form usage
export type CreateUserRequest = CreateIndividualUserRequest | CreateCompanyUserRequest;
