export interface Provider {
  id:      number;
  name:    string;
  users:   any[];
  tariffs: Tariff[];
}

export interface Tariff {
  id:                number;
  code:              string;
  providerId:        number;
  provider:          null;
  products:          Product[];
  omieDistributions: OmieDistribution[];
  boePowers:         BoePower[];
}

export interface BoePower {
  id:       number;
  tariffId: number;
  tariff:   null;
  periods:  BoePowerPeriod[];
}

export interface BoePowerPeriod {
  id:         number;
  period:     number;
  value:      number;
  boePowerId: number;
  boePower:   null;
}

export interface OmieDistribution {
  id:         number;
  periodName: string;
  tariffId:   number;
  tariff:     null;
  periods:    OmieDistributionPeriod[];
}

export interface OmieDistributionPeriod {
  id:                 number;
  period:             number;
  factor:             number;
  omieDistributionId: number;
  omieDistribution:   null;
}

export interface Product {
  id:       number;
  name:     string;
  tariffId: number;
  tariff:   null;
  periods:  ProductPeriod[];
}

export interface ProductPeriod {
  id:        number;
  period:    number;
  value:     number;
  productId: number;
  product:   null;
}
