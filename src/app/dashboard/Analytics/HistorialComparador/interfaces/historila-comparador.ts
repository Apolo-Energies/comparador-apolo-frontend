export interface HistorialComparador {
    id: string;
    userId: string;
    user: User;
    archivoId: string;
    archivo: null;
    cups: string;
    consumoAnual: number;
    fecha: Date;
}

export interface User {
    id?: string;
    fullName: string;
    email: string;
    isActive: boolean;
    role?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userCommissions?: any[];
}


export interface Summary {
    data: Datum[];
    totalCUPS: number;
    totalAnnualConsumption: number;
    totalUsersActive: number;
}

export interface Datum {
    fullName: string;
    email: string;
    totalCUPS: number;
    totalAnnualConsumption: number;
    totalDailyConsumption?: number;
    date?: string;
}

export interface HistorialPaged {
    items: HistorialComparador[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface DailySummary {
    date: string;
    totalCUPS: number;
    totalConsumption: number;
}

export interface MonthlySummary {
    date:             Date;
    totalCUPS:        number;
    totalConsumption: number;
}
