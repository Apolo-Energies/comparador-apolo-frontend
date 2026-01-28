import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { User, UserPaged } from "@/app/dashboard/Settings/Users/interfaces/user";
import { CreateUserRequest } from "@/app/dashboard/Settings/Users/interfaces/CreateUserRequest";

export const getUsers = async (token: string): Promise<ApiResponse<User[]>> => {
  try {
    const response = await ApiManager.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Get users error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: [],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    return {
      result: {} as UserPaged,
      status: 500,
      isSuccess: false,
      displayMessage: "Error obteniendo usuarios",
      errorMessages: [String(error)],
    };
  }
};


export const getSelectUsers = async (token: string): Promise<ApiResponse<User[]>> => {
  try {
    const response = await ApiManager.get("/user/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Get users error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: [],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const registerUser = async (token: string, userData: CreateUserRequest): Promise<ApiResponse<User>> => {
  try {
    // Base payload for both Individual and Company
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

    // Add company-specific fields if personType is 1 (Company)
    const payload = userData.personType === 1
      ? {
          ...basePayload,
          cif: userData.cif,
          companyName: userData.companyName,
        }
      : basePayload;

    const response = await ApiManager.post("/user", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: response.data.isSuccess,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Register user error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as User,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: {} as User,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const deactivateUser = async (
  token: string,
  userId: string,
  isActive: boolean
): Promise<ApiResponse<string>> => {
  try {
    const payload = { isActive };

    const response = await ApiManager.put(`/user/${userId}/deactivate`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Deactivate user error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: "",
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: "",
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const changeUserRole = async (
  token: string,
  userId: string,
  role: number
): Promise<ApiResponse<User>> => {
  try {
    const payload = { role };

    const response = await ApiManager.put(`/user/${userId}/role`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Change user role error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as User,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: {} as User,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};


export const updateProveedor = async (
  token: string,
  userId: string,
  providerId: number
): Promise<ApiResponse<User>> => {
  try {
    const payload = { providerId };

    const response = await ApiManager.put(`/user/provider/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Change user role error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as User,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: {} as User,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const changeUserEnergyExpert = async (
  token: string,
  userId: string,
  isEnergyExpert: boolean
): Promise<ApiResponse<User>> => {
  try {
    const payload = {
      isEnergyExpert,
    };

    const response = await ApiManager.put(
      `/user/energy-expert/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: false,
      }
    );

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Change energy expert error:", error);

    if (axios.isAxiosError(error)) {
      return {
        result: {} as User,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage:
          error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages:
          error.response?.data?.errorMessages ?? [error.message],
      };
    }

    return {
      result: {} as User,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};


