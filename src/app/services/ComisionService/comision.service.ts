
import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { Commission } from "@/app/dashboard/Settings/Comision/interfaces/commission";
import { UserCommission } from "@/app/dashboard/Settings/Users/interfaces/user";

export const getCommissions = async (token: string): Promise<ApiResponse<Commission[]>> => {
  try {
    const response = await ApiManager.get("/commission", {
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
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get users error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: [error.message],
      };
    }
    return {
      result: [],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: ["An unexpected error occurred"],
    };
  }
};


export const registerCommission = async (
  token: string,
  commisionData: Commission
): Promise<ApiResponse<Commission>> => {
  try {
    const response = await ApiManager.post("/commission/create", commisionData, {
      headers: {
        Authorization: `Bearer ${token}`, // el Master hace la creación
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Register user error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as Commission,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: [error.message],
      };
    }
    return {
      result: {} as Commission,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: ["An unexpected error occurred"],
    };
  }
};

export const assignCommission = async (
  token: string,
  payload: {userId: string, commissionId: string}
): Promise<ApiResponse<UserCommission>> => {
  try {
    const response = await ApiManager.post("/usercommission/assign", payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Master asigna la comisión
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Assign commission error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as UserCommission,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: [error.message],
      };
    }
    return {
      result: {} as UserCommission,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: ["An unexpected error occurred"],
    };
  }
};

export const updateCommission = async (
  token: string,
  commisionData: Commission
): Promise<ApiResponse<Commission>> => {
  try {
    const response = await ApiManager.put(`/commission/update/${commisionData.id}`, commisionData, {
      headers: {
        Authorization: `Bearer ${token}`, // el Master hace la creación
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Register user error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as Commission,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: [error.message],
      };
    }
    return {
      result: {} as Commission,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: ["An unexpected error occurred"],
    };
  }
};