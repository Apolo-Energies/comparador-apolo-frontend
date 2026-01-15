import { CreateUserRequest } from "./CreateUserRequest";

export const INDIVIDUAL_FIELDS: (keyof CreateUserRequest)[] = [
    "email",
    "name",
    "surnames",
    "dni",
    "phone",
    "legalAddress",
    "notificationAddress",
    "bankAccount",
    "role",
];

export const COMPANY_FIELDS: (keyof CreateUserRequest)[] = [
    "email",
    "name",
    "surnames",
    "dni",
    "companyName",
    "cif",
    "phone",
    "legalAddress",
    "notificationAddress",
    "bankAccount",
    "role",
];
