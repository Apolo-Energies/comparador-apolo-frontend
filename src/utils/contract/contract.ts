export const getContractInfo = (endDate?: Date | string | null) => {
    if (!endDate) return null;

    const end = new Date(endDate);

    if (isNaN(end.getTime())) return null; // evita fechas inválidas

    const today = new Date();

    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 0
        ? { label: "Contrato vencido", days: 0 }
        : {
            label: `Tu contrato termina en ${diffDays} día${diffDays !== 1 ? "s" : ""}`,
            days: diffDays,
        };
};