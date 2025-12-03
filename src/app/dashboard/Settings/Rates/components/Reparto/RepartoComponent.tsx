import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { TrendingUp } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import {
  RepartosOmie,
  RepartosOmiePeriodo,
} from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import { useAlertStore } from "@/app/store/ui/alert.store";
import {
  createRepartoOmiePeriodo,
  deleteRepartoOmiePeriodo,
  updateRepartoOmiePeriodo,
} from "@/app/services/TarifarioService/reparto-omi-periodo.service";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const RepartoComponent = ({ token }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { showAlert } = useAlertStore();
  const { tarifas, setTarifas } = useTarifaStore();

  // Editar celda
  const handleEditStart = (cellId: string, value: number): void => {
    setEditingCell(cellId);
    setEditValue(isNaN(value) ? "" : value.toString());
  };

  const handleEditCancel = (): void => {
    setEditingCell(null);
    setEditValue("");
  };

  // Guardar cambios
  const handleEditSave = async (periodo: RepartosOmiePeriodo) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const valor = parseFloat(editValue);
    if (isNaN(valor)) return;

    try {
      if (periodo.id === -1) {
        // Crear
        const response = await createRepartoOmiePeriodo(token, {
          repartoOmieId: periodo.repartoOmieId,
          periodo: periodo.periodo,
          factor: valor,
          repartoOmie: null,
        });

        if (response.isSuccess) {
          showAlert("Agregado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              repartosOmie: tarifa.repartosOmie.map((r) =>
                r.id === periodo.repartoOmieId
                  ? {
                      ...r,
                      periodos: [
                        ...r.periodos.filter((p) => p.periodo !== periodo.periodo),
                        { ...periodo, id: response.result.id, factor: valor },
                      ],
                    }
                  : r
              ),
            }))
          );
        }
      } else {
        // Actualizar
        const response = await updateRepartoOmiePeriodo(token, periodo.id, {
          ...periodo,
          factor: valor,
        });

        if (response.isSuccess) {
          showAlert("Actualizado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              repartosOmie: tarifa.repartosOmie.map((r) =>
                r.id === periodo.repartoOmieId
                  ? {
                      ...r,
                      periodos: r.periodos.map((p) =>
                        p.id === periodo.id ? { ...p, factor: valor } : p
                      ),
                    }
                  : r
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

  // Eliminar
  const handleDeletePeriodo = async (periodo: RepartosOmiePeriodo) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    try {
      const response = await deleteRepartoOmiePeriodo(token, periodo.id);
      if (response.isSuccess) {
        showAlert("Eliminado correctamente", "success");
        setTarifas(
          tarifas.map((tarifa) => ({
            ...tarifa,
            repartosOmie: tarifa.repartosOmie.map((r) =>
              r.id === periodo.repartoOmieId
                ? {
                    ...r,
                    periodos: r.periodos.filter((p) => p.id !== periodo.id),
                  }
                : r
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

  // Filtrar repartos
  const getFilteredData = (): RepartosOmie[] => {
    const allRepartos = tarifas.flatMap((t) => t.repartosOmie);
    if (selectedTarifa === "all") return allRepartos;
    if (selectedTarifa === "") return [];
    return allRepartos.filter((r) => r.tarifaId.toString() === selectedTarifa);
  };

  // Preparar periodos
  const preparePeriodoData = (reparto: RepartosOmie) => {
    const periodosMap = new Map(reparto.periodos.map((p) => [p.periodo, p]));

    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const periodo: RepartosOmiePeriodo = periodosMap.get(num) ?? {
        id: -1,
        periodo: num,
        factor: null,
        repartoOmieId: reparto.id,
        repartoOmie: null,
      };

      return {
        periodo,
        cellId: `reparto-${reparto.id}-${num}`,
        isEditing: editingCell === `reparto-${reparto.id}-${num}`,
      };
    });
  };

  // Render
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
          {getFilteredData().map((reparto) => {
            const periodosRender = preparePeriodoData(reparto);

            return (
              <div
                key={reparto.id}
                className="bg-card border-r rounded-lg border border-border shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-sidebar-selected-text" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {tarifas.find((t) => t.id === reparto.tarifaId)?.codigo}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {reparto.periodoNombre}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                    Factores de Reparto
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {periodosRender.map(({ periodo, cellId, isEditing }) => (
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
                          onDelete={(p) =>
                            handleDeletePeriodo(p as RepartosOmiePeriodo)
                          }
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
