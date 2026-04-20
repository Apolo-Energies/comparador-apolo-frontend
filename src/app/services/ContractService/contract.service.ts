
import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ContractCollaboratorPaged } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collaborator";
import { ContractFilters, SendContractRequest, SendContractResult } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";
import { Contract } from "@/app/dashboard/Settings/Users/interfaces/user";

interface CreateManualContractRequest {
    customerId: string;
    origin: number;
}



export const getContracts = async (token: string, filters: ContractFilters = {}): Promise<ApiResponse<ContractCollaboratorPaged>> => {
    try {
        const response = await ApiManager.get("/contracts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                ...filters,
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
                result: {} as ContractCollaboratorPaged,
                status: error.response?.status ?? 500,
                isSuccess: false,
                displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
                errorMessages: [error.message],
            };
        }
        return {
            result: {} as ContractCollaboratorPaged,
            status: 500,
            isSuccess: false,
            displayMessage: "Unknown error",
            errorMessages: ["An unexpected error occurred"],
        };
    }
};

export const sendContract = async (
    token: string,
    payload: SendContractRequest
): Promise<ApiResponse<SendContractResult>> => {
    try {
        const response = await ApiManager.post("/contracts/renew", payload, {
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
        console.error("Send contract error:", error);

        if (axios.isAxiosError(error)) {
            return {
                result: {} as SendContractResult,
                status: error.response?.status ?? 500,
                isSuccess: false,
                displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
                errorMessages: [error.message],
            };
        }

        return {
            result: {} as SendContractResult,
            status: 500,
            isSuccess: false,
            displayMessage: "Unknown error",
            errorMessages: ["An unexpected error occurred"],
        };
    }
};

export const createManualContract = async (
    token: string,
    payload: CreateManualContractRequest
): Promise<ApiResponse<Contract>> => {
    try {
        const response = await ApiManager.post("/contracts", payload, {
            headers: { Authorization: `Bearer ${token}` },
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
        console.error("Create manual contract error:", error);

        if (axios.isAxiosError(error)) {
            return {
                result: {} as Contract,
                status: error.response?.status ?? 500,
                isSuccess: false,
                displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
                errorMessages: error.response?.data?.errorMessages ?? [error.message],
            };
        }

        return {
            result: {} as Contract,
            status: 500,
            isSuccess: false,
            displayMessage: "Unknown error",
            errorMessages: ["An unexpected error occurred"],
        };
    }
};
