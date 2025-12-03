export const formatValue = (
  value: number | null,
  decimals: number = 6
): string => {
  if (value === null) return "N/A";
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const getPeriodColor = (periodo: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-red-100 text-red-800 border-red-200',
    2: 'bg-orange-100 text-orange-800 border-orange-200',
    3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    4: 'bg-green-100 text-green-800 border-green-200',
    5: 'bg-blue-100 text-blue-800 border-blue-200',
    6: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[periodo] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getModalidadColor = (modalidad: string): string => {
  const colors: Record<string, string> = {
    "Index Base": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Fijo Fácil": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Fijo Estable": "bg-teal-50 text-teal-700 border-teal-200",
    Passpool: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return colors[modalidad] || "bg-gray-50 text-gray-700 border-gray-200";
};

