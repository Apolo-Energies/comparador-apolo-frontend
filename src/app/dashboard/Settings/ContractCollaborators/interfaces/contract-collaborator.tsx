export interface ContractCollaboratorPaged {
    items:           ContractCollaborator[];
    currentPage:     number;
    pageSize:        number;
    totalCount:      number;
    totalPages:      number;
    hasPreviousPage: boolean;
    hasNextPage:     boolean;
}

export interface ContractCollaborator{
    id:                  string;
    personType:          number;
    dni:                 string;
    firstName:           string;
    lastName:            string;
    legalAddress:        string;
    notificationAddress: string;
    email:               string;
    phone:               string;
    bankAccount:         string;
    cif:                 null | string;
    companyName:         null | string;
    signatureRequestId:  null;
    signatureStatus:     number;
    isActive:            boolean;
    startDate:           Date;
    endDate:             null;
    createdAt:           Date;
    updatedAt:           Date;
}
