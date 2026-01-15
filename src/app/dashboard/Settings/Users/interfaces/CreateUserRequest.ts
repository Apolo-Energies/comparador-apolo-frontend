export interface CreateUserRequest {
    personType: 0 | 1; // 0 = Individual, 1 = Company
    email: string;
    name: string;
    surnames: string;
    companyName?: string;
    phone?: string;
    dni?: string;
    cif?: string;
    legalAddress?: string;
    notificationAddress?: string;
    bankAccount?: string;
    role: number; // 1 = Master, 2 = Colaborador
}