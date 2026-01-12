import { LightningIcon } from "@/incons/LightningIcon";
import React, { useState } from "react";

interface Periodo {
    periodo: number;
    precioEnergiaOferta?: number | string;
    precioPotenciaOferta?: number | string;
}

interface Props {
    periodos: Periodo[];
}

export const PeriodPrice = ({ periodos }: Props) => {
    const [open, setOpen] = useState(false);

    const precios = Array.from({ length: 6 }, (_, i) => {
        const periodo = periodos.find((p) => p.periodo === i + 1);
        return periodo?.precioEnergiaOferta ?? "0,000000";
    });

    return (
        <div className="bg-card border border-border rounded-xl p-3 w-full transition-all duration-300">

            <div className="grid grid-cols-[44px_1fr_40px] items-center gap-4">

                <LightningIcon className="h-9 w-9 text-foreground" />
                

                <p className="text-lg font-semibold text-foreground">
                    Precios ofertados
                </p>

                <button
                    onClick={() => setOpen(!open)}
                    className="
            h-8 w-8 rounded-lg border border-border 
            flex items-center justify-center 
            text-muted-foreground 
            hover:bg-muted transition-colors
        "
                >
                    <span
                        className={`
                inline-block transform transition-transform duration-300 
                ${open ? "rotate-0" : "rotate-180"}
            `}
                    >
                        –
                    </span>
                </button>
            </div>

            {/* CONTENIDO EXPANDIBLE */}
            <div
                className={`
        overflow-hidden transition-all duration-300 
        ${open ? "max-h-[500px] mt-2 opacity-100" : "max-h-0 opacity-0"}
    `}
            >

                {/* ALINEADO DEBAJO DEL TÍTULO */}
                <div className="grid grid-cols-2 gap-10 text-sm text-foreground pl-16">

                    {/* COLUMNA DE ENERGÍA */}
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((p) => {
                            const periodo = periodos.find((x) => x.periodo === p);
                            const valor = periodo?.precioEnergiaOferta ?? "0,000000";

                            return (
                                <p key={p}>
                                    <span className="opacity-70">Energía P{p}:</span>{" "}
                                    <span className="text-blue-300">{valor}</span>
                                </p>
                            );
                        })}
                    </div>

                    {/* COLUMNA DE POTENCIA (si viene luego en tu backend) */}
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((p) => {
                            const periodo = periodos.find((x) => x.periodo === p);
                            const valorPot = periodo?.precioPotenciaOferta ?? "0,000000";

                            return (
                                <p key={p}>
                                    <span className="opacity-70">Potencia P{p}:</span>{" "}
                                    <span className="text-blue-300">{valorPot}</span>
                                </p>
                            );
                        })}
                    </div>
                </div>

            </div>



        </div>
    );
};
