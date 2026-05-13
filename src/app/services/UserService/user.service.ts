import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { User, UserPaged } from "@/app/dashboard/Settings/Users/interfaces/user";
import { CreateUserRequest } from "@/app/dashboard/Settings/Users/interfaces/CreateUserRequest";
import { UpdateUserRequest } from "../interfaces/request/user";

const extractError = (error: unknown): { status: number; message: string } => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 500,
      message: error.response?.data?.error ?? error.message ?? "Unknown error",
    };
  }
  return { status: 500, message: String(error) };
};

export const getUsers = async (token: string): Promise<ApiResponse<User[]>> => {
  try {
    const response = await ApiManager.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get users error:", error);
    const { status, message } = extractError(error);
    return { result: [], status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const getUsersByFilters = async (
  token: string,
  filters: {
    fullName?: string;
    email?: string;
    role?: string;
    page?: number;
    pageSize?: number;
  }
): Promise<ApiResponse<UserPaged>> => {
  try {
    const response = await ApiManager.get("/user/user-filter", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        fullName: filters.fullName,
        email: filters.email,
        role: filters.role,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    const { status, message } = extractError(error);
    return { result: {} as UserPaged, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const getSelectUsers = async (token: string): Promise<ApiResponse<User[]>> => {
  try {
    const response = await ApiManager.get("/user/users", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get users error:", error);
    const { status, message } = extractError(error);
    return { result: [], status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const registerUser = async (token: string, userData: CreateUserRequest): Promise<ApiResponse<User>> => {
  try {
    const basePayload = {
      personType: Number(userData.personType),
      email: userData.email,
      name: userData.name,
      surnames: userData.surnames,
      phone: userData.phone,
      legalAddress: userData.legalAddress,
      notificationAddress: userData.notificationAddress,
      bankAccount: userData.bankAccount,
      dni: userData.dni,
      role: Number(userData.role),
    };

    const payload = userData.personType === 1
      ? { ...basePayload, cif: userData.cif, companyName: userData.companyName }
      : basePayload;

    const response = await ApiManager.post("/user", payload, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Register user error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const deactivateUser = async (
  token: string,
  userId: string,
  isActive: boolean
): Promise<ApiResponse<string>> => {
  try {
    const response = await ApiManager.put(`/user/${userId}/deactivate`, { isActive }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Deactivate user error:", error);
    const { status, message } = extractError(error);
    return { result: "", status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const changeUserRole = async (
  token: string,
  userId: string,
  role: number
): Promise<ApiResponse<User>> => {
  try {
    const response = await ApiManager.put(`/user/${userId}/role`, { role }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Change user role error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const updateProveedor = async (
  token: string,
  userId: string,
  providerId: number
): Promise<ApiResponse<User>> => {
  try {
    const response = await ApiManager.put(`/user/provider/${userId}`, { providerId }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Update proveedor error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const changeUserEnergyExpert = async (
  token: string,
  userId: string,
  isEnergyExpert: boolean
): Promise<ApiResponse<User>> => {
  try {
    const response = await ApiManager.put(`/user/energy-expert/${userId}`, { isEnergyExpert }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Change energy expert error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const getUserById = async (
  token: string,
  userId: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await ApiManager.get(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get user by id error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const deleteUser = async (
  token: string,
  userId: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await ApiManager.delete(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: null,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Delete user error:", error);
    const { status, message } = extractError(error);
    return { result: null, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};

export const updateUser = async (
  token: string,
  userId: string,
  payload: UpdateUserRequest
): Promise<ApiResponse<User>> => {
  try {
    const response = await ApiManager.put(`/user/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Update user error:", error);
    const { status, message } = extractError(error);
    return { result: {} as User, status, isSuccess: false, displayMessage: message, errorMessages: [message] };
  }
};
