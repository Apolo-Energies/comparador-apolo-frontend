import { SipsRowconsumption, SipsPS } from "@/app/dashboard/Sips/interface/sips";
import axios from "axios";
import Papa from "papaparse";

export interface ApiResponse<T> {
    result: T;
    status: number;
    isSuccess: boolean;
    displayMessage: string;
    errorMessages: string[];
}

export interface SipsFullResponse {
    ps: SipsPS | null;
    consumos: SipsRowconsumption[];
}

const API_URL = "https://sips.gruporenovae.es/api/GetSIPS";
const API_KEY = "80e984fa-4957-47ec-895b-1fbf321a2d56"; 

// Eliminiar cmabiamos al backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchCSV = async <T>(body: any): Promise<T[]> => {
    const response = await axios.post(API_URL, body, {
        headers: {
            "X-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
        responseType: "text",
    });

    const parsed = Papa.parse<T>(response.data, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
    });

    return parsed.data;
};

export const getSipsData = async (cups: string): Promise<ApiResponse<SipsFullResponse>> => {
    try {

        const psData = await fetchCSV<SipsPS>({
            Procedimiento: "PS",
            TipoSuministro: "ELECTRICIDAD",
            CUPS: cups,
        });

        const consumosData = await fetchCSV<SipsRowconsumption>({
            Procedimiento: "CONSUMOS",
            TipoSuministro: "ELECTRICIDAD",
            CUPS: cups,
        });

        return {
            result: {
                ps: psData.length > 0 ? psData[0] : null,
                consumos: consumosData
            },
            status: 200,
            isSuccess: true,
            displayMessage: "Datos obtenidos correctamente",
            errorMessages: []
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error al obtener datos SIPS:", error);

        return {
            result: {
                ps: null,
                consumos: []
            },
            status: error.response?.status || 500,
            isSuccess: false,
            displayMessage: "Error al obtener datos",
            errorMessages: [error.message || "Unknown error"]
        };
    }
};
