export interface Proveedor {
  id:       number;
  nombre:   string;
  tarifas:  Tarifa[];
}

export interface Tarifa {
  id:           number;
  codigo:       string;
  proveedorId:  number;
  proveedor:    null;
  productos:    Producto[];
  repartosOmie: RepartosOmie[];
  potenciasBoe: PotenciasBoe[];
}

export interface PotenciasBoe {
  id:       number;
  tarifaId: number;
  tarifa:   null;
  periodos: PotenciasBoePeriodo[];
}

export interface PotenciasBoePeriodo {
  id:            number;
  periodo:       number;
  valor:         number | null;
  potenciaBoeId: number;
  potenciaBoe:   null;
}
export interface ProductoPeriodo {
  id:         number;
  periodo:    number;
  valor:      number | null;
  productoId: number;
  producto:   null;
}

export interface RepartosOmiePeriodo {
  id:            number;
  periodo:       number;
  factor:        number | null;
  repartoOmieId: number;
  repartoOmie:   null;
}

export interface Producto {
  id:       number;
  nombre:   string;
  tarifaId: number;
  tarifa:   null;
  periodos: ProductoPeriodo[];
}

export interface RepartosOmie {
  id:            number;
  periodoNombre: string;
  tarifaId:      number;
  tarifa:        null;
  periodos:      RepartosOmiePeriodo[];
}

