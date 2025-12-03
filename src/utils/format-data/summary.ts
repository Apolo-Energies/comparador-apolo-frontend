import { SipsRowconsumption } from "@/app/dashboard/Sips/interface/sips";

const formatNumber = (num: number): string =>
    num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

const toNumberOrNull = (num: number | null | undefined) => {
    if (!num || num === 0) return null;
    return Number((num / 1000).toFixed(2));
};


export const getLast12MonthsPeriodSummary = (rows: SipsRowconsumption[]) => {
    if (!rows || rows.length === 0)
        return { periods: [], total: 0, totalFormatted: "0.00" };

    // Ordenar por fecha fin de consumo (desc)    
    const sorted = [...rows].sort(
        (a, b) => new Date(b.fechaFinMesConsumo).getTime() - new Date(a.fechaFinMesConsumo).getTime()
    );

    // Ultimos 12 meses
    const last12 = sorted.slice(0, 12);

    // Sumar consumos por periodo
    const periodsValues = [
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP1 || 0) / 1000, 0),
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP2 || 0) / 1000, 0),
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP3 || 0) / 1000, 0),
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP4 || 0) / 1000, 0),
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP5 || 0) / 1000, 0),
        last12.reduce((acc, r) => acc + (r.consumoEnergiaActivaEnWhP6 || 0) / 1000, 0),
    ];

    const periods = periodsValues.map((value, i) => ({
        label: `Periodo ${i + 1}`,
        value,
        formatted: formatNumber(value)
    }));

    const total = periodsValues.reduce((acc, v) => acc + v, 0);

    return {
        periods,
        total,
        totalFormatted: formatNumber(total)
    };
};

export const getMonthlyStackedChartData = (rows: SipsRowconsumption[]) => {
    console.log("rows for trend: ", rows)
    if (!rows || rows.length === 0) return [];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    // Ordenar por fecha ASC
    const sorted = [...rows].sort(
        (a, b) =>
            new Date(a.fechaFinMesConsumo).getTime() -
            new Date(b.fechaFinMesConsumo).getTime()
    );

    const last12 = sorted.slice(-12);

    return last12.map((item) => {
        const monthIndex = new Date(item.fechaFinMesConsumo).getMonth();

        return {
            month: months[monthIndex],
            P1: toNumberOrNull(item.consumoEnergiaActivaEnWhP1),
            P2: toNumberOrNull(item.consumoEnergiaActivaEnWhP2),
            P3: toNumberOrNull(item.consumoEnergiaActivaEnWhP3),
            P4: toNumberOrNull(item.consumoEnergiaActivaEnWhP4),
            P5: toNumberOrNull(item.consumoEnergiaActivaEnWhP5),
            P6: toNumberOrNull(item.consumoEnergiaActivaEnWhP6),
        };
    });
};


export const getLast12MonthsTrend = (rows: SipsRowconsumption[]) => {
    if (!rows || rows.length < 24) {
        return {
            currentTotal: 0,
            previousTotal: 0,
            percent: 0,
            trend: "equal"
        };
    }

    const sorted = [...rows].sort(
        (a, b) => new Date(b.fechaFinMesConsumo).getTime() - new Date(a.fechaFinMesConsumo).getTime()
    );

    const last12 = sorted.slice(0, 12);       // últimos 12 meses
    const previous12 = sorted.slice(12, 24);  // los 12 meses previos

    const sumKwh = (list: SipsRowconsumption[]) =>
        list.reduce((acc, r) =>
            acc +
            (r.consumoEnergiaActivaEnWhP1 || 0) / 1000 +
            (r.consumoEnergiaActivaEnWhP2 || 0) / 1000 +
            (r.consumoEnergiaActivaEnWhP3 || 0) / 1000 +
            (r.consumoEnergiaActivaEnWhP4 || 0) / 1000 +
            (r.consumoEnergiaActivaEnWhP5 || 0) / 1000 +
            (r.consumoEnergiaActivaEnWhP6 || 0) / 1000,
            0
        );

    const currentTotal = sumKwh(last12);
    const previousTotal = sumKwh(previous12);

    if (previousTotal === 0) {
        return {
            currentTotal,
            previousTotal,
            percent: 0,
            trend: "equal",
        };
    }

    const percent = ((currentTotal - previousTotal) / previousTotal) * 100;

    return {
        currentTotal,
        previousTotal,
        percent: Number(percent.toFixed(1)),
        trend: percent > 0 ? "up" : percent < 0 ? "down" : "equal",
    };
};
