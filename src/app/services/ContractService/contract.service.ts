
import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ContractCollaboratorPaged } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collaborator";
import { ContractFilters } from "@/app/dashboard/Settings/ContractCollaborators/interfaces/contract-collab-filters";

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

