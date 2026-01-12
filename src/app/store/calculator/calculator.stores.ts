import { create } from "zustand";
import { FacturaResult, Periodo, PotenciaResult, ProductoResult } from "./calculator.types";
import { calcularFacturaHelper, calcularPotencia, calcularPrecios } from "./calculator.helpers";
import { OcrData } from "@/app/dashboard/Analytics/interfaces/matilData";

interface CalculatorState {
  tarifa: string | null;
  producto: string;
  resultados: ProductoResult | null;
  resultadosPotencia: { tarifa: string; periodos: PotenciaResult[] } | null;
  factura: FacturaResult | null;

  setTarifa: (tarifa: string) => void;
  setProducto: (
    tarifa: string,
    producto: string,
    precioMedioOmie: number,
    feeEnergia: number
  ) => void;

  setPotencia: (tarifa: string, feePotencia: number, modalidad: string) =>
    | { tarifa: string; periodos: PotenciaResult[] }
    | null;
  
  calcularFactura: (matilData: OcrData) => FacturaResult | null;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  tarifa: null,
  producto: "",
  resultados: null,
  resultadosPotencia: null,
  factura: null,

  setTarifa: (tarifa: string) => {
    set({ tarifa });
  },

  setProducto: (
    tarifa: string,
    producto: string,
    precioMedioOmie: number,
    feeEnergia: number
  ) => {
    if (!tarifa) return null;
    const periodos: { periodo: Periodo; base: number; oferta: number }[] = (
      [1, 2, 3, 4, 5, 6] as Periodo[]
    ).map((periodo) => {
      const { base, oferta } = calcularPrecios(
        tarifa,
        producto,
        periodo,
        precioMedioOmie,
        feeEnergia
      );
      return { periodo, base, oferta };
    });

    const resultados = { producto, periodos };

    set({ producto, resultados }); // actualiza el store
    return resultados; // también devuelvo los resultados inmediatamente
  },

  setPotencia: (tarifa: string, feePotencia: number, modalidad: string) => {
    if (!tarifa) return null;
    const periodos = ([1, 2, 3, 4, 5, 6] as Periodo[]).map(
      (periodo) => {
        const { base, oferta } = calcularPotencia(tarifa, periodo, feePotencia, modalidad);
        return {
          periodo,
          basePotencia: base,
          ofertaPotencia: oferta,
        };
      }
    );

    const resultadosPotencia = { tarifa, periodos };
    set({ resultadosPotencia });
    return resultadosPotencia;
  },

  calcularFactura: (matilData) => {
    const { resultados, resultadosPotencia } = get();
    if (!resultados || !resultadosPotencia) return null;
    const factura = calcularFacturaHelper(resultados, resultadosPotencia, matilData);
    set({ factura });
    return factura;
  },
  
}));
