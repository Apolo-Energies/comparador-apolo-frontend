import { UserRole } from "@/app/dashboard/Settings/Users/enums/user-role.enum";

export const UserRoleLabel: Record<UserRole, string> = {
  [UserRole.MASTER]: "Master",
  [UserRole.COLLABORATOR]: "Colaborador",
  [UserRole.REFERRER]: "Referenciador",
  [UserRole.TESTER]: "Tester",
  [UserRole.COLLABORATOR_REFERRER]: "Colaborador - Referenciador"
};