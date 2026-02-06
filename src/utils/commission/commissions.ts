export const getSnapEnergiaByTarifa = (
    tarifa?: string
): number | undefined => {
    switch (tarifa) {
        case "Fijo Snap Mini":
            return 50;
        case "Fijo Snap":
            return 75;
        case "Fijo Snap Maxi":
            return 100;
        default:
            return undefined;
    }
};


export const getIndexEnergiaByProducto = (
    producto?: string
): number | undefined => {
    switch (producto) {
        case "Index Coste":
            return 0.5;
        case "Index Base":
            return 0.55;
        case "Index Promo":
            return 0.85;
        default:
            return undefined;
    }
};

export const getPromo3MEnergyByProduct = (
    producto?: string
): number | undefined => {
    switch (producto) {
        case "Promo 3M Lite":
            return 0.005;
        case "Promo 3M Pro":
            return 0.01;
        case "Promo 3M Plus":
            return 0.015;
        default:
            return undefined;
    }
};

export const SNAP_PRODUCTS = [
    "Fijo Snap Mini",
    "Fijo Snap",
    "Fijo Snap Maxi",
] as const;

export const isSnapProduct = (producto?: string): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SNAP_PRODUCTS.includes(producto as any);

export const normalizeComision = (value?: number): number | undefined =>
    value === undefined || value === 0 ? undefined : value;

export const PROMO_3M_PRODUCTS = [
    "Promo 3M Lite",
    "Promo 3M Pro",
    "Promo 3M Plus",
] as const;

export const isPromo3MProduct = (producto?: string): boolean =>
    !!producto && PROMO_3M_PRODUCTS.includes(producto as any);

