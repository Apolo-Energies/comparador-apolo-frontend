export type Periodo = 1 | 2 | 3 | 4 | 5 | 6;

export interface PeriodoResult {
  periodo: Periodo;
  base: number;
  oferta: number;
}

export interface ProductoResult {
  producto: string;
  periodos: PeriodoResult[];
}

export interface PotenciaPeriodoResult {
  periodo: Periodo;
  base: number;
  oferta: number;
}

export interface PotenciaResult {
  periodo: Periodo;
  basePotencia: number;
  ofertaPotencia: number;
}

export interface FacturaPeriodo {
  periodo: Periodo;
  kwh: number;                 // de matil
  kw: number;                  // de matil
  precioEnergia: number;
  precioEnergiaOferta: number; // €/kWh
  precioPotencia: number;
  precioPotenciaOferta: number;// €/kW·día
  costeEnergia: number;        // kWh * precioEnergiaOferta
  costePotencia: number;       // kW  * precioPotenciaOferta
  totalPeriodo: number;        // suma
}

export interface FacturaResult {
  periodos: FacturaPeriodo[];
  totalEnergia: number;
  totalPotencia: number;
  total: number;
  ahorroEstudio: number;
  ahorro_porcent: number
  ahorroXAnio: number
  subTotal: number;
  impuestoElectrico: number;
  iva: number;
  totalAnio: number;
  costesComunesConIE: number
  dias: number;
}