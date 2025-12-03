const BASE_COLORS = ["#777DF5", "#F691A6", "#B79DF5", "#323438", "#FE89C8", "#41BFF3"];
export const getColor = (index: number) => {
    const base = BASE_COLORS[index % BASE_COLORS.length];
    const extraShift = Math.floor(index / BASE_COLORS.length) * 15; // aumenta luminosidad cada "vuelta"

    // Convertimos HEX a HSL para variar luminosidad
    const hexToHSL = (H: string) => {
        let r = 0, g = 0, b = 0;
        if (H.length === 7) {
            r = parseInt(H.substring(1, 3), 16);
            g = parseInt(H.substring(3, 5), 16);
            b = parseInt(H.substring(5, 7), 16);
        }
        r /= 255; g /= 255; b /= 255;
        const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
        let h = 0, s = 0, l = (cmax + cmin) / 2;
        if (delta !== 0) {
            h = delta === 0 ? 0 :
                cmax === r ? ((g - b) / delta) % 6 :
                    cmax === g ? (b - r) / delta + 2 :
                        (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            s = delta / (1 - Math.abs(2 * l - 1));
        }
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        l = Math.min(100, l + extraShift); // ajusta luminosidad
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    return hexToHSL(base);
}