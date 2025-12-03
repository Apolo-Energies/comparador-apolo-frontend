export const calcularDias = (
  fechaInicio: string | Date | undefined,
  fechaFin: string | Date | undefined
): number => {
  try {
    if (fechaInicio && fechaFin) {
      const convertirAFecha = (f: string | Date): Date => {
        if (f instanceof Date) return f;
        const partes = f.split("/").map(Number);
        if (partes.length !== 3) throw new Error("Formato inválido");
        const [dia, mes, anio] = partes;
        return new Date(anio, mes - 1, dia);
      };

      const inicio = convertirAFecha(fechaInicio);
      const fin = convertirAFecha(fechaFin);

      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) throw new Error("Fecha inválida");

      const diffMs = fin.getTime() - inicio.getTime();
      const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24));

      return diffDias >= 0 ? diffDias + 1 : 30; // incluye ambos días
    } else {
      return 30; // si falta una fecha
    }
  } catch {
    return 30; // si hay error
  }
};
