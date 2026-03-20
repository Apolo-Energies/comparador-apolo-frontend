
import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";


export const uploadContractDocument = async (
    token: string,
    contractId: string,
    documentType: number,
    file: File
): Promise<ApiResponse<string>> => {
    try {
        const formData = new FormData();
        formData.append("documentType", documentType.toString());
        formData.append("file", file);

        const response = await ApiManager.post(
            `/contractdocument/${contractId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            }
        );

        return {
            result: response.data.result ?? "Documento subido correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Upload contract document error:", error);

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

export const replaceContractDocument = async (
    token: string,
    documentId: string,
    file: File
): Promise<ApiResponse<string>> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await ApiManager.post(
            `/contract-documents/${documentId}/replace`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            }
        );

        return {
            result: response.data.result ?? "Documento reemplazado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Replace contract document error:", error);

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

export const rejectContractDocument = async (
    token: string,
    documentId: string,
    comment: string
): Promise<ApiResponse<string>> => {
    try {
        const response = await ApiManager.post(
            `/contractdocument/reject/${documentId}`,
            { comment },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: false,
            }
        );

        return {
            result: response.data.result ?? "Documento rechazado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Reject contract document error:", error);

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

export const validateContractDocument = async (
    token: string,
    documentId: string
): Promise<ApiResponse<string>> => {
    try {
        const response = await ApiManager.post(
            `/contractdocument/validate/${documentId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: false,
            }
        );

        return {
            result: response.data.result ?? "Documento validado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Validate contract document error:", error);

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

export const deleteContractDocument = async (
    token: string,
    documentId: string
): Promise<ApiResponse<string>> => {
    try {
        const response = await ApiManager.delete(
            `/contractdocument/${documentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: false,
            }
        );

        return {
            result: response.data.result ?? "Documento eliminado correctamente.",
            status: response.status,
            isSuccess: true,
            displayMessage: response.data.displayMessage ?? "",
            errorMessages: [],
        };
    } catch (error) {
        console.error("Delete contract document error:", error);

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
