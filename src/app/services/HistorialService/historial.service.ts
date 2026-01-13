import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { DailySummary, HistorialPaged, MonthlySummary, Summary } from "@/app/dashboard/Analytics/HistorialComparador/interfaces/historila-comparador";
import { HistorialFilters, HistorialSummaryFilters } from "@/app/dashboard/Analytics/HistorialComparador/interfaces/historial-filter";
import { ApiManager } from "../ApiManager/ApiManager";

export const getHistorialComparador = async (
  token: string,
  filters: HistorialFilters = {}
): Promise<ApiResponse<HistorialPaged>> => {
  try {
    const { fullName, email, fecha, cups, page = 1, pageSize = 15 } = filters;

    const response = await ApiManager.get("/comparisonhistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        fullName,
        email,
        fechaInicio: fecha,
        cups,
        page,
        pageSize
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
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as HistorialPaged,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: {} as HistorialPaged,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const getSummary = async (
  token: string,
  filters: HistorialSummaryFilters = {}
): Promise<ApiResponse<Summary>> => {
  try {
    const { fechaInicio, fechaFin } = filters;

    const response = await ApiManager.get("/comparisonhistory/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        fechaInicio,
        fechaFin
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
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: { data: [], totalCUPS: 0, totalAnnualConsumption: 0, totalUsersActive: 0 },
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: { data: [], totalCUPS: 0, totalAnnualConsumption: 0, totalUsersActive: 0 },
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const getDailySummary = async (
  token: string,
  filters: HistorialSummaryFilters = {}
): Promise<ApiResponse<DailySummary[]>> => {
  try {
    const { fechaInicio, fechaFin } = filters;

    const response = await ApiManager.get("/comparisonhistory/dailysummary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        fechaInicio,
        fechaFin
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
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [] as DailySummary[],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: [] as DailySummary[],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};

export const getMotnhlySummary = async (
  token: string,
  filters: HistorialSummaryFilters = {}
): Promise<ApiResponse<MonthlySummary[]>> => {
  try {
    const { fechaInicio, fechaFin } = filters;

    const response = await ApiManager.get("/comparisonhistory/monthlysummary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        fechaInicio,
        fechaFin
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
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [] as MonthlySummary[],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: [] as MonthlySummary[],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};
