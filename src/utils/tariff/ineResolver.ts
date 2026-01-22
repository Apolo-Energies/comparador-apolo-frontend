// src/shared/mappers/tarifaMapper.ts
export const TARIFA_ATR_MAP: Record<string, string> = {
  "018": "2.0TD",
  "019": "3.0TD",
  "020": "6.1TD",
};

export const getTarifaLabel = (codigo?: string | null): string => {
  if (!codigo) return "—";
  return TARIFA_ATR_MAP[codigo] ?? "No soportada";
};
