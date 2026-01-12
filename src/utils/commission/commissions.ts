export const getSnapEnergiaByTarifa = (tarifa?: string): number => {
    console.log("Calculating fee for tarifa:", tarifa);
    switch (tarifa) {
        case "Fijo Snap Mini":
            return 50;
        case "Fijo Snap":
            return 75;
        case "Fijo Snap Max":
            return 100;
        default:
            return 0;
    }
};

export const getIndexEnergiaByProducto = (producto: string): number => {
    switch (producto) {
        case "Index Coste":
            return 0.5;
        case "Index Base":
            return 0.55;
        case "Index Promo":
            return 0.85;
        default:
            return 0;
    }
};


export const SNAP_PRODUCTS = [
    "Fijo Snap Mini",
    "Fijo Snap",
    "Fijo Snap Max",
] as const;

export const isSnapProduct = (producto?: string): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SNAP_PRODUCTS.includes(producto as any);