export interface Sips {
    ps:       PS;
    consumos: Consumo[];
}

export interface Consumo {
    cups:                   Cups;
    fechaInicio:            Date;
    fechaFin:               Date;
    codigoTarifaATR:        string;
    energiaP1:              number;
    energiaP2:              number;
    energiaP3:              number;
    energiaP4:              number;
    energiaP5:              number;
    energiaP6:              number;
    reactivaP1:             number;
    reactivaP2:             number;
    reactivaP3:             number;
    reactivaP4:             number;
    reactivaP5:             number;
    reactivaP6:             number;
    potenciaP1:             number;
    potenciaP2:             number;
    potenciaP3:             number;
    potenciaP4:             number;
    potenciaP5:             number;
    potenciaP6:             number;
    codigoDHEquipoDeMedida: string;
    codigoTipoLectura:      string;
}

export type Cups = string;
export interface PS {
    codigoEmpresaDistribuidora:       string;
    cups:                             Cups;
    nombreEmpresaDistribuidora:       string;
    codigoPostalPS:                   string;
    municipioPS:                      string;
    codigoProvinciaPS:                string;
    fechaAltaSuministro:              Date;
    codigoTarifaATREnVigor:           string;
    codigoTensionV:                   string;
    potenciaMaximaBIEW:               number;
    potenciaMaximaAPMW:               number;
    codigoClasificacionPS:            string;
    codigoDisponibilidadICP:          string;
    tipoPerfilConsumo:                string;
    valorDerechosExtensionW:          number;
    valorDerechosAccesoW:             number;
    codigoPropiedadEquipoMedida:      string;
    codigoPropiedadICP:               string;
    potenciaContratadaP1:             number;
    potenciaContratadaP2:             number;
    potenciaContratadaP3:             number;
    potenciaContratadaP4:             number;
    potenciaContratadaP5:             number;
    potenciaContratadaP6:             number;
    fechaUltimoMovimientoContrato:    Date;
    fechaUltimoCambioComercializador: Date;
    fechaLimiteDerechosReconocidos:   null;
    fechaUltimaLectura:               Date;
    informacionImpagos:               string;
    importeDepositoGarantiaEuros:     number;
    tipoIdTitular:                    string;
    esViviendaHabitual:               boolean;
    codigoComercializadora:           string;
    codigoTelegestion:                string;
    codigoFasesEquipoMedida:          string;
    codigoAutoconsumo:                string;
    codigoTipoContrato:               string;
    codigoPeriodicidadFacturacion:    string;
    codigoBIE:                        string;
    fechaEmisionBIE:                  null;
    fechaCaducidadBIE:                null;
    codigoAPM:                        string;
    fechaEmisionAPM:                  null;
    fechaCaducidadAPM:                null;
    relacionTransformacionIntensidad: null;
    cnae:                             string;
    codigoModoControlPotencia:        string;
    potenciaCGPW:                     null;
    codigoDHEquipoDeMedida:           string;
    codigoAccesibilidadContador:      string;
    codigoPSContratable:              string;
    motivoEstadoNoContratable:        string;
    codigoTensionMedida:              string;
    codigoClaseExpediente:            string;
    codigoMotivoExpediente:           string;
    codigoTipoSuministro:             string;
    aplicacionBonoSocial:             string;
}


