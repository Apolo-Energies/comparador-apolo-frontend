import { Button } from "@/components/buttons/button";
import { DownloadIcon } from "@/incons/DownloadIcon";
import { FilterIcon } from "@/incons/FilterIcon";
import { SipsPS } from "../../interface/sips";

interface Props {
    psData: SipsPS;
    onExport: () => void;
    onComparativa: () => void;
    onClear: () => void;
}

export const SipsInfoCard = ({ onClear, psData, onExport, onComparativa }: Props) => {
    // if (!psData) return null;

    return (
        <div className="mb-6 bg-card rounded-lg border border-border p-6 relative">

            <button
                onClick={onClear}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
            >
                ✕
            </button>

            <div className="flex justify-between items-start pr-10">
                <p className="text-lg font-semibold">{psData.cups}</p>

                <div className="flex gap-2">
                    <Button
                        onClick={onComparativa}
                        variant="secondary"
                        size="md"
                    >
                        <FilterIcon />
                        Generar comparativa
                    </Button>

                    <Button
                        variant="secondary"
                        size="md"
                        onClick={onExport}
                    >
                        <DownloadIcon size={14} />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-4 text-sm">
                <p>
                    <span className="font-semibold">Provincia:</span>{" "}
                    <span className="text-muted-foreground">{psData.codigoProvinciaPS}</span>
                </p>

                <p>
                    <span className="font-semibold">Distribuidora:</span>{" "}
                    <span className="text-muted-foreground">{psData.nombreEmpresaDistribuidora}</span>
                </p>

                <p>
                    <span className="font-semibold">Localidad:</span>{" "}
                    <span className="text-muted-foreground">Alzira</span>
                </p>

                <p>
                    <span className="font-semibold">Tarifa:</span>{" "}
                    <span className="text-muted-foreground">3.0 TD</span>
                </p>

                <p>
                    <span className="font-semibold">Código Postal:</span>{" "}
                    <span className="text-muted-foreground">{psData.codigoPostalPS}</span>
                </p>

                <p>
                    <span className="font-semibold">POT Max:</span>{" "}
                    <span className="text-muted-foreground">{psData.potenciaMaximaBIEW} kW</span>
                </p>

            </div>
        </div>
    );
};