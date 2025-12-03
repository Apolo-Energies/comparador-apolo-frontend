import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { Zap } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { PotenciasBoe, PotenciasBoePeriodo } from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import { useAlertStore } from "@/app/store/ui/alert.store";
import {
  createPotenciaBoePeriodo,
  deletePotenciaBoePeriodo,
  updatePotenciaBoePeriodo,
} from "@/app/services/TarifarioService/potencia-boe-periodo.service";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const PotenciaComponent = ({ token }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { showAlert } = useAlertStore();
  const tarifas = useTarifaStore((state) => state.tarifas);
  const setTarifas = useTarifaStore((state) => state.setTarifas);

  // Editar celda
  const handleEditStart = (cellId: string, value: number) => {
    setEditingCell(cellId);
    setEditValue(isNaN(value) ? "" : value.toString());
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  // Guardar cambios
  const handleEditSave = async (periodo: PotenciasBoePeriodo) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const valor = parseFloat(editValue);
    if (isNaN(valor)) return;

    try {
      if (periodo.id === -1) {
        // Crear
        const response = await createPotenciaBoePeriodo(token, {
          potenciaBoeId: periodo.potenciaBoeId,
          periodo: periodo.periodo,
          valor,
          potenciaBoe: null,
        });

        if (response.isSuccess) {
          showAlert("Agregado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              potenciasBoe: tarifa.potenciasBoe.map((p) =>
                p.id === periodo.potenciaBoeId
                  ? {
                      ...p,
                      periodos: [
                        ...p.periodos.filter((pp) => pp.periodo !== periodo.periodo),
                        { ...periodo, id: response.result.id, valor },
                      ],
                    }
                  : p
              ),
            }))
          );
        }
      } else {
        // Actualizar
        const response = await updatePotenciaBoePeriodo(token, periodo.id, {
          ...periodo,
          valor,
        });

        if (response.isSuccess) {
          showAlert("Actualizado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              potenciasBoe: tarifa.potenciasBoe.map((p) =>
                p.id === periodo.potenciaBoeId
                  ? {
                      ...p,
                      periodos: p.periodos.map((pp) =>
                        pp.id === periodo.id ? { ...pp, valor } : pp
                      ),
                    }
                  : p
              ),
            }))
          );
        }
      }
    } catch (error) {
      showAlert("Error al guardar.", "error");
      console.error(error);
    }

    setEditingCell(null);
    setEditValue("");
  };

  // Eliminar periodo
  const handleDeletePeriodo = async (periodo: PotenciasBoePeriodo) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    try {
      const response = await deletePotenciaBoePeriodo(token, periodo.id);
      if (response.isSuccess) {
        showAlert("Eliminado correctamente", "success");
        setTarifas(
          tarifas.map((tarifa) => ({
            ...tarifa,
            potenciasBoe: tarifa.potenciasBoe.map((p) =>
              p.id === periodo.potenciaBoeId
                ? { ...p, periodos: p.periodos.filter((pp) => pp.id !== periodo.id) }
                : p
            ),
          }))
        );
      }
    } catch (error) {
      showAlert("Error al eliminar.", "error");
      console.error(error);
    }

    setEditingCell(null);
    setEditValue("");
  };

  // Filtrar potencias
  const getFilteredData = (): PotenciasBoe[] => {
    const allPotencias = tarifas.flatMap((t) => t.potenciasBoe);
    if (selectedTarifa === "all") return allPotencias;
    if (selectedTarifa === "") return [];
    return allPotencias.filter((p) => p.tarifaId.toString() === selectedTarifa);
  };

  // Preparar periodos
  const preparePeriodoData = (potencia: PotenciasBoe) => {
    const periodosMap = new Map(potencia.periodos.map((p) => [p.periodo, p]));

    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const periodo: PotenciasBoePeriodo = periodosMap.get(num) ?? {
        id: -1,
        periodo: num,
        valor: null,
        potenciaBoeId: potencia.id,
        potenciaBoe: null,
      };

      return {
        periodo,
        cellId: `potencia-${potencia.id}-${num}`,
        isEditing: editingCell === `potencia-${potencia.id}-${num}`,
      };
    });
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTarifa={selectedTarifa}
        setSelectedTarifa={setSelectedTarifa}
        options={tarifas}
        showAll
      />

      {selectedTarifa && (
        <div className="space-y-6">
          {getFilteredData().map((potencia) => {
            const tarifa = tarifas.find((t) => t.id === potencia.tarifaId);

            return (
              <div
                key={potencia.id}
                className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-border flex items-center gap-3">
                  <div className="p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-sidebar-selected-text" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {tarifa?.codigo ?? "Sin código"}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                    Periodos de Potencia BOE
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {preparePeriodoData(potencia).map(({ periodo, cellId, isEditing }) => (
                      <div
                        key={cellId}
                        className="text-center p-4 bg-body rounded-lg group hover:bg-card transition-all duration-200 border border-border relative"
                      >
                        <div
                          className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg mb-3 border ${getPeriodColor(
                            periodo.periodo
                          )}`}
                        >
                          P{periodo.periodo}
                        </div>

                        <PeriodoCard
                          periodo={periodo}
                          cellId={cellId}
                          isEditing={isEditing}
                          editValue={editValue}
                          onEditStart={handleEditStart}
                          onEditChange={setEditValue}
                          onEditSave={() => handleEditSave(periodo)}
                          onEditCancel={handleEditCancel}
                          onDelete={(p) => handleDeletePeriodo(p as PotenciasBoePeriodo)}
                          decimals={6}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
