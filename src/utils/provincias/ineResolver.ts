import { PROVINCIAS_INE } from "./ProvinciasDiccionario";
import municipiosRaw from "./municipiosINE_2025.json";

const MUNICIPIOS_INE = municipiosRaw as Record<string, string>;

export const resolveProvinciaINE = (
  codigo?: string | number
): string => {
  if (codigo === null || codigo === undefined) return "Desconocida";
  return (
    PROVINCIAS_INE[String(codigo).padStart(2, "0")] ?? "Desconocida"
  );
};

export const resolveMunicipioINE = (
  codigo?: string | number
): string => {
  if (codigo === null || codigo === undefined) return "Desconocido";
  return (
    MUNICIPIOS_INE[String(codigo).padStart(5, "0")] ?? "Desconocido"
  );
};
