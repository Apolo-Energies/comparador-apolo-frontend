import { CreateCompanyUserRequest, CreateIndividualUserRequest } from "./CreateUserRequest";

export const INDIVIDUAL_FIELDS: (keyof CreateIndividualUserRequest)[] = [
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

export const COMPANY_FIELDS: (keyof CreateCompanyUserRequest)[] = [
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
