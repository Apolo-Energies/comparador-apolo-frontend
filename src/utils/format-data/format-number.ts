export const formatNumberShort = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
};

export const formatPowerES = (
    value?: number | string | null,
    decimals: number = 2
): string => {
    if (value === null || value === undefined) return "-";

    const numberValue = Number(value);
    if (isNaN(numberValue)) return "-";

    return new Intl.NumberFormat("es-ES", {
        useGrouping: true,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(numberValue);
};


export const wattsToKilowatts = (watts: number): number => {
  return watts / 1000;
};
