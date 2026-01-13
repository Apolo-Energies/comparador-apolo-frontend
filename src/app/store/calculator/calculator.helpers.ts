import { FacturaResult, Periodo, PotenciaResult, ProductoResult } from "./calculator.types";
import { useTariffStore } from "../tarifario/tarifa.store";
import { OcrData } from "@/app/dashboard/Analytics/interfaces/matilData";

const round6 = (n: number) => Math.round(n * 1e6) / 1e6;
const round3 = (num: number) => Math.round(num * 1000) / 1000;

export const getBaseValue = (tarifa: string, producto: string, periodo: Periodo): number => {
  const { tariffs } = useTariffStore.getState();
  const t = tariffs.find((x) => x.code === tarifa);
  if (!t) {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prod = t.products.find((p: any) => p.name === producto);
  if (!prod) {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = prod.periods.find((p: any) => p.period === periodo);
  return p?.value ?? 0;
};

export const getRepartoOmie = (tarifa: string, periodo: Periodo): number => {
  const { tariffs } = useTariffStore.getState();
  const t = tariffs.find((x) => x.code === tarifa);
  if (!t) return 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reparto = t.omieDistributions?.find((r: any) => r.periods.some((p: any) => p.period === periodo));
  if (!reparto) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = reparto.periods.find((p: any) => p.period === periodo);
  return p?.factor ?? 0;
};

export const getPotenciaBOE = (tarifa: string, periodo: Periodo): number => {
  const { tariffs } = useTariffStore.getState();
  const t = tariffs.find((x) => x.code === tarifa);
  if (!t) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const potencia = t.boePowers?.find((r: any) => r.periods.some((p:any) => p.period === periodo));
  if (!potencia) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = potencia.periods.find((p: any) => p.period === periodo);
  return p?.value ?? 0;
};

export const calcularPrecios = (
  tarifa: string,
  modalidad: string,
  periodo: Periodo,
  precioMedioOmie: number,
  feeEnergia: number
) => {

  const modalidadBase =
  modalidad === "Index Coste" || modalidad === "Index Promo"
    ? "Index Base"
    : modalidad;

  const valorTarifa = getBaseValue(tarifa, modalidadBase, periodo);
  const repartoOmie = getRepartoOmie(tarifa, periodo);

  let precioBase = 0;

  if (modalidad.startsWith('Fijo')) {
    precioBase = valorTarifa;
  } else if (modalidad === "Index Coste" || modalidad === "Passpool") {
    precioBase = valorTarifa + (precioMedioOmie * repartoOmie * 1.15) / 1000;
  } else if (modalidad === "Index Base") {
    precioBase = valorTarifa + ((precioMedioOmie + 5) * repartoOmie * 1.15) / 1000;
  } else if (modalidad === "Index Promo") {
    precioBase = valorTarifa + ((precioMedioOmie + 8) * repartoOmie * 1.15) / 1000;
  } else {
    precioBase = valorTarifa + ((precioMedioOmie + 5) * repartoOmie * 1.15) / 1000;
  }

  const precioOferta = precioBase + feeEnergia / 1000;

  return {
    base: round6(precioBase),
    oferta: round6(precioOferta),
  };
};

export const calcularPotencia = (
  tarifa: string,
  periodo: Periodo,
  feePotencia: number,
  modalidad: string,
) => {
  const potenciaBase = getPotenciaBOE(tarifa, periodo);
  
  // if (tarifa === "3.0TD" && periodo === 4 && modalidad === "Index Promo") {
  //   return {
  //     base: 0,
  //     oferta: round6(0.010086441),
  //   };
  // }
  const potenciaOferta = modalidad === "Index Promo" ? potenciaBase : potenciaBase + feePotencia / 365;
  return {
    base: round6(potenciaBase),
    oferta: round6(potenciaOferta),
  };
};

export const calcularFacturaHelper = (
  resultados: ProductoResult,
  resultadosPotencia: { tarifa: string; periodos: PotenciaResult[] },
  matilData: OcrData
): FacturaResult => {
  const PS: Periodo[] = [1, 2, 3, 4, 5, 6];

  const periodos = PS.map((periodo, idx) => {
    const dias = matilData.periodo_facturacion.numero_dias
    const kwh = matilData.energia[idx]?.activa.kwh ?? 0;
    const kw  = matilData.potencia[idx]?.contratada?.kw ?? 0;
    const actEu = matilData.energia[idx]?.reactiva.importe ?? 0;
    const potEu  = matilData.potencia[idx]?.contratada?.importe ?? 0;

    // Si no hay consumo de energía ni potencia, lo omitimos
    if (kwh === 0 && kw === 0) return null;

    const precioEnergia = kwh > 0 ? round6(actEu / kwh) : 0;
    const precioPotencia = kw > 0 ? round6(potEu / kw / dias) : 0;
    const precioEnergiaOferta   = resultados.periodos[idx]?.oferta ?? 0;
    const precioPotenciaOferta  = resultadosPotencia.periodos[idx]?.ofertaPotencia ?? 0;

    const costeEnergia  = kwh > 0 ? round6(kwh * precioEnergiaOferta) : 0;
    const costePotencia = kw  > 0 ? round6(kw  * precioPotenciaOferta * dias) : 0;
    const totalPeriodo  = round6(costeEnergia + costePotencia);

    return { periodo, kwh, kw, precioEnergia, precioEnergiaOferta, precioPotencia, precioPotenciaOferta, costeEnergia, costePotencia, totalPeriodo };
  }).filter(Boolean) as {
    periodo: Periodo;
    kwh: number;
    kw: number;
    precioEnergia: number
    precioPotencia: number
    precioEnergiaOferta: number;
    precioPotenciaOferta: number;
    costeEnergia: number;
    costePotencia: number;
    totalPeriodo: number;
  }[];

  const dias = matilData.periodo_facturacion.numero_dias;
  const descuento_electricidad = matilData.descuentos
  .reduce((total, d) => total + (d.importe ?? 0), 0);
  const otros_servicios = matilData.otros_servicios
  .reduce((total, s) => total + (s.importe ?? 0), 0);

  const kwhEnergia = round6(periodos.reduce((acc, p) => acc + p.kwh, 0))
  const totalEnergia  = round6(periodos.reduce((acc, p) => acc + p.costeEnergia, 0));
  const totalPotencia = round6(periodos.reduce((acc, p) => acc + p.costePotencia, 0));
  const costesComunesConIE = (matilData.totales_electricidad.energia.reactiva || 0) + 
  (matilData.totales_electricidad.potencia.exceso || 0) + 
  (matilData.bono_social.importe || 0) - 
  (descuento_electricidad)

  console.log("kwh energia total:", kwhEnergia);
  console.log("energia total:", totalEnergia);
  console.log("potencia total:", totalPotencia);

  const impuestoElectrico = round6((totalEnergia + totalPotencia + costesComunesConIE)*0.0511269632);
  const subTotal = totalEnergia + totalPotencia + costesComunesConIE + impuestoElectrico + matilData.equipos.importe;
  const iva = subTotal * 0.21;
  const total         = round6(subTotal + iva);
  console.log("total calculado:", total);
  const ahorroEstudio = round3(matilData.total - total);
  console.log("total matildata:", matilData.total);
  console.log("ahorro estudio:", ahorroEstudio);
  const ahorro_porcent = parseFloat(((ahorroEstudio / matilData.total) * 100).toFixed(2));
  const diasFacturados = dias;
  const totalAnio = 10 * kwhEnergia;
  const ahorroAnio = (
    (
      ((matilData.totales_electricidad.energia.activa - totalEnergia) / kwhEnergia * totalAnio) +
      ((matilData.totales_electricidad.potencia.contratada - totalPotencia) / diasFacturados * 365) +
      (otros_servicios / diasFacturados) * 365
    ) * (1 + 0.0511269632 + 0.21)
  );
  
  const ahorroXAnio = Number(ahorroAnio.toFixed(2));
  return { periodos, totalEnergia, totalPotencia, total, ahorroEstudio, ahorro_porcent, ahorroXAnio, subTotal, impuestoElectrico, iva, totalAnio, costesComunesConIE, dias };
};
