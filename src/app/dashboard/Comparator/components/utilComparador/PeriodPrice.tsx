import React, { useState } from "react";

interface Periodo {
    periodo: number;
    precioEnergiaOferta?: number | string;
}

interface Props {
    periodos: Periodo[];
}

export const PeriodPrice = ({ periodos }: Props) => {
    const [open, setOpen] = useState(true);

    const precios = Array.from({ length: 6 }, (_, i) => {
        const periodo = periodos.find((p) => p.periodo === i + 1);
        return periodo?.precioEnergiaOferta ?? "0,000000";
    });

    return (
        <div className="bg-card border border-border rounded-xl p-6 w-full transition-all duration-300">

            <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-foreground">
                        Precios ofertados
                    </p>
                </div>

                <button className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted">
                    {open ? "–" : "+"}
                </button>
            </div>

            <div
                className={`
            overflow-hidden transition-all duration-300 
            ${open ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"}
            `}
            >

                <div className="grid grid-cols-2 gap-6 text-sm text-foreground">

                    <div className="space-y-3">
                        {[0, 1, 2].map((index) => (
                            <p key={index} className="text-sm">
                                <span className="opacity-70">Energía P{index + 1}:</span>{" "}
                                <span className="text-blue-300">{precios[index]}</span>
                            </p>
                        ))}
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="space-y-3">
                        {[3, 4, 5].map((index) => (
                            <p key={index} className="text-sm">
                                <span className="opacity-70">Energía P{index + 1}:</span>{" "}
                                <span className="text-blue-300">{precios[index]}</span>
                            </p>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
};
