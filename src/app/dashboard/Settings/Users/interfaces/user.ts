import { string } from "zod";
import { PersonType } from "../../ContractCollaborators/interfaces/contract-collab-filters";

export interface UserPaged {
    items: User[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface User {
    id:                      string;
    fullName:                string;
    email:                   string;
    isEnergyExpert:          boolean;
    isActive:                boolean;
    phone:                   string;
    customerId:              string;
    identifier:              string;
    role:                    number;
    providerId:              number;
    provider:                null;
    customer:                Customer;
    contract:                Contract;
    contractSignatureStatus: number;
    hasActiveContract:       boolean;
    commissions:             UserCommission[];
    parentUserId:            null;
    isSubUser:               boolean;
    subUserSplits:           any[];
}

export interface UserCommission {
    id:             string;
    userId?:         string;
    commissionId?:   string;
    user?:           null;
    commissionType: CommissionType;
    startDate?:      Date;
    endDate?:        null;
    cobrado?:        boolean;
    isActive?:       boolean;
}

export interface CommissionType {
    id:              string;
    percentage:      number;
    name:            string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userCommissions: any[];
}

export interface Contract {
    id:                 string;
    customerId:         string;
    legalAddress:       string;
    bankAccount:        string;
    email:              string;
    origin:             number;
    signatureRequestId: string;
    signatureStatus:    number;
    documents:          Document[];
    isActive:           boolean;
    startDate:          Date | null;
    endDate:            Date | null;
    createdAt:          Date;
}

export interface Document {
    id:               string;
    contractId:       string;
    documentType:     number;
    status:           number;
    fileUrl:          string;
    previewUrl?:        string;
    reviewComment?:    null | string;
    reviewedAt:       null;
    reviewedByUserId?: null;
    createdAt:        Date;
}

export interface Customer {
    id:                  string;
    kind:                number;
    personType:          PersonType;
    firstName:           string;
    lastName:            string;
    companyName:         null;
    dni:                 string;
    cif:                 null;
    email:               string;
    phone:               string;
    userId:              string;
    legalAddress:        string;
    notificationAddress: string;
    postalCode:          null;
    province:            null;
    city:                null;
    bankAccount:         string;
    iban:                null;
    swiftBic:            null;
    createdAt:           Date;
}

