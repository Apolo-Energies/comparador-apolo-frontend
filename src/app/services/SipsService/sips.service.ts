import { Consumo, PS } from "@/app/dashboard/Sips/interface/sips";
import { ApiManager } from "../ApiManager/ApiManager";

export interface ApiResponse<T> {
    result: T;
    status: number;
    isSuccess: boolean;
    displayMessage: string;
    errorMessages: string[];
}

export interface SipsFullResponse {
    ps: PS | null;
    consumos: Consumo[];
}

export const getSipsData = async (token: string, cups: string) => {
    const response = await ApiManager.post<ApiResponse<SipsFullResponse>>(
        "/sips",
        { cups },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};
