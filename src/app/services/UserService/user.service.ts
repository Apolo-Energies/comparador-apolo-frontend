import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { User } from "@/app/dashboard/Settings/Users/interfaces/user";

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

export const registerUser = async (
  token: string,
  userData: User
): Promise<ApiResponse<User>> => {
  try {

    const payload = {
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role
    };

    const response = await ApiManager.post("/user", payload, {
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
