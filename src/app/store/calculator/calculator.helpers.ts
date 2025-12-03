import { FacturaResult, Periodo, PotenciaResult, ProductoResult } from "./calculator.types";
import { Detalle } from "@/app/dashboard/Analytics/interfaces/matilData";
import { calcularDias } from "@/utils/dates";
import { useTarifaStore } from "../tarifario/tarifa.store";

const round6 = (n: number) => Math.round(n * 1e6) / 1e6;
const round3 = (num: number) => Math.round(num * 1000) / 1000;

export const getBaseValue = (tarifa: string, producto: string, periodo: Periodo): number => {
  const { tarifas } = useTarifaStore.getState();
  const t = tarifas.find((x) => x.codigo === tarifa);
  if (!t) {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prod = t.productos.find((p: any) => p.nombre === producto);
  if (!prod) {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = prod.periodos.find((p: any) => p.periodo === periodo);

  return p?.valor ?? 0;
};

export const getRepartoOmie = (tarifa: string, periodo: Periodo): number => {
  const { tarifas } = useTarifaStore.getState();
  const t = tarifas.find((x) => x.codigo === tarifa);
  if (!t) return 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reparto = t.repartosOmie?.find((r: any) => r.periodos.some((p: any) => p.periodo === periodo));
  if (!reparto) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = reparto.periodos.find((p: any) => p.periodo === periodo);
  return p?.factor ?? 0;
};

export const getPotenciaBOE = (tarifa: string, periodo: Periodo): number => {
  const { tarifas } = useTarifaStore.getState();
  const t = tarifas.find((x) => x.codigo === tarifa);
  if (!t) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const potencia = t.potenciasBoe?.find((r: any) => r.periodos.some((p:any) => p.periodo === periodo));
  if (!potencia) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = potencia.periodos.find((p: any) => p.periodo === periodo);
  return p?.valor ?? 0;
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
  matilData: {fecha_inicio: string, fecha_fin: string,  energia: { p: number; kwh: number, activa_eur: number }[]; potencia: { p: number; kw: number, potencia_eur: number }[], detalle: Detalle }
): FacturaResult => {
  const PS: Periodo[] = [1, 2, 3, 4, 5, 6];

  const periodos = PS.map((periodo, idx) => {
    const dias = calcularDias(matilData?.fecha_inicio ?? "", matilData?.fecha_fin)
    const kwh = matilData.energia[idx]?.kwh ?? 0;
    const kw  = matilData.potencia[idx]?.kw ?? 0;
    const actEu = matilData.energia[idx]?.activa_eur ?? 0;
    const potEu  = matilData.potencia[idx]?.potencia_eur ?? 0;

    // Si no hay consumo de energía ni potencia, lo omitimos
    if (kwh === 0 && kw === 0) return null;

    const precioEnergia = round6(actEu / kwh) ?? 0;
    const precioPotencia = round6(potEu / kw / dias) ?? 0;
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

  const dias = calcularDias(matilData?.fecha_inicio ?? "", matilData?.fecha_fin)
  const kwhEnergia = round6(periodos.reduce((acc, p) => acc + p.kwh, 0))
  const totalEnergia  = round6(periodos.reduce((acc, p) => acc + p.costeEnergia, 0));
  const totalPotencia = round6(periodos.reduce((acc, p) => acc + p.costePotencia, 0));
  const costesComunesConIE = (matilData.detalle.totales_energia.reactiva_eur || 0) + 
  (matilData.detalle.totales_potencia.exceso_eur || 0) + 
  (matilData.detalle.bono_social || 0) - 
  (matilData.detalle.descuento_electricidad)

  const impuestoElectrico = round6((totalEnergia + totalPotencia + costesComunesConIE)*0.0511269632);
  const subTotal = totalEnergia + totalPotencia + costesComunesConIE + impuestoElectrico + matilData.detalle.equipos;
  const iva = subTotal * 0.21;
  const total         = round6(subTotal + iva);
  const ahorroEstudio = round3(matilData.detalle.total - total);
  const ahorro_porcent = parseFloat(((ahorroEstudio / matilData.detalle.total) * 100).toFixed(2));
  const diasFacturados = dias;
  const totalAnio = 10 * kwhEnergia;
  const ahorroAnio = (
    (
      ((matilData.detalle.totales_energia.activa_eur - totalEnergia) / kwhEnergia * totalAnio) +
      ((matilData.detalle.totales_potencia.potencia_eur - totalPotencia) / diasFacturados * 365) +
      (matilData.detalle.otros / diasFacturados) * 365
    ) * (1 + 0.0511269632 + 0.21)
  );
  
  const ahorroXAnio = Number(ahorroAnio.toFixed(2));
  return { periodos, totalEnergia, totalPotencia, total, ahorroEstudio, ahorro_porcent, ahorroXAnio, subTotal, impuestoElectrico, iva, totalAnio, costesComunesConIE, dias };
};
