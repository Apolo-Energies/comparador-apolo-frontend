import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { UserCommission } from "@/app/dashboard/Settings/Users/interfaces/user";

export const getCommissionUser = async (
  token: string,
  id: string
): Promise<ApiResponse<UserCommission>> => {
  try {
    const response = await ApiManager.get(`/usercommission/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result as UserCommission,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get commission error:", error);
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
