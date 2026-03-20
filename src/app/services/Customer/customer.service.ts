import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { CreateCustomerRequest, UpdateCustomerRequest } from "../interfaces/request/customer";

export const createCustomer = async (
    token: string,
    payload: CreateCustomerRequest
): Promise<ApiResponse<string>> => {
    try {
        const response = await ApiManager.post("/customer", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
        });

        return {
            result: response.data.result ?? "Cliente creado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Create customer error:", error);

        if (axios.isAxiosError(error)) {
            return {
                result: "",
                status: error.response?.status ?? 500,
                isSuccess: false,
                displayMessage:
                    error.response?.data?.displayMessage ?? "Unknown error",
                errorMessages:
                    error.response?.data?.errorMessages ?? [error.message],
            };
        }

        return {
            result: "",
            status: 500,
            isSuccess: false,
            displayMessage: "Unknown error",
            errorMessages: ["An unexpected error occurred"],
        };
    }
};

export const updateCustomer = async (
    token: string,
    payload: UpdateCustomerRequest
): Promise<ApiResponse<string>> => {
    try {
        const response = await ApiManager.put("/customer", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
        });

        return {
            result: response.data.result ?? "Cliente actualizado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Update customer error:", error);

        if (axios.isAxiosError(error)) {
            return {
                result: "",
                status: error.response?.status ?? 500,
                isSuccess: false,
                displayMessage:
                    error.response?.data?.displayMessage ?? "Unknown error",
                errorMessages:
                    error.response?.data?.errorMessages ?? [error.message],
            };
        }

        return {
            result: "",
            status: 500,
            isSuccess: false,
            displayMessage: "Unknown error",
            errorMessages: ["An unexpected error occurred"],
        };
    }
};