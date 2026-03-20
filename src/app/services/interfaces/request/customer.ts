export interface CreateCustomerRequest {
    kind: number;
    personType: number;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    legalAddress: string;
    notificationAddress: string;
    bankAccount: string;
    dni?: string;
    cif?: string;
    companyName?: string;
}

export interface UpdateCustomerRequest {
    id: string;
    kind: number;
    personType: number;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    legalAddress: string;
    notificationAddress: string;
    bankAccount: string;
    dni?: string;
    cif?: string;
    companyName?: string;
    userId?: string;
}