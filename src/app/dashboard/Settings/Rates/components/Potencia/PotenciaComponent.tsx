import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { Zap } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { BoePower, BoePowerPeriod } from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import { useAlertStore } from "@/app/store/ui/alert.store";
import {
  createPotenciaBoePeriodo,
  deletePotenciaBoePeriodo,
  updatePotenciaBoePeriodo,
} from "@/app/services/TarifarioService/potencia-boe-periodo.service";
import { useTariffStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const PotenciaComponent = ({ token }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { showAlert } = useAlertStore();
  const tarifas = useTariffStore((state) => state.tariffs);
  const setTarifas = useTariffStore((state) => state.setTariffs);

  const handleEditStart = (cellId: string, value: number) => {
    setEditingCell(cellId);
    setEditValue(isNaN(value) ? "" : value.toString());
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = async (period: BoePowerPeriod) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const value = parseFloat(editValue);
    if (isNaN(value)) return;

    try {
      if (period.id === -1) {
        const response = await createPotenciaBoePeriodo(token, {
          boePowerId: period.boePowerId,
          period: period.period,
          value,
          boePower: null,
        });

        if (response.isSuccess) {
          showAlert("Agregado correctamente", "success");
          setTarifas(
            tarifas.map((tariff) => ({
              ...tariff,
              boePowers: tariff.boePowers.map((p) =>
                p.id === period.boePowerId
                  ? {
                      ...p,
                      periods: [
                        ...p.periods.filter(
                          (pp) => pp.period !== period.period
                        ),
                        { ...period, id: response.result.id, value },
                      ],
                    }
                  : p
              ),
            }))
          );
        }
      } else {
        const response = await updatePotenciaBoePeriodo(token, period.id, {
          ...period,
          value,
        });

        if (response.isSuccess) {
          showAlert("Actualizado correctamente", "success");
          setTarifas(
            tarifas.map((tariff) => ({
              ...tariff,
              boePowers: tariff.boePowers.map((p) =>
                p.id === period.boePowerId
                  ? {
                      ...p,
                      periods: p.periods.map((pp) =>
                        pp.id === period.id ? { ...pp, value } : pp
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

  const handleDeletePeriodo = async (period: BoePowerPeriod) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    try {
      const response = await deletePotenciaBoePeriodo(token, period.id);
      if (response.isSuccess) {
        showAlert("Eliminado correctamente", "success");
        setTarifas(
          tarifas.map((tariff) => ({
            ...tariff,
            boePowers: tariff.boePowers.map((p) =>
              p.id === period.boePowerId
                ? {
                    ...p,
                    periods: p.periods.filter(
                      (pp) => pp.id !== period.id
                    ),
                  }
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

  const getFilteredData = (): BoePower[] => {
    const allPowers = tarifas.flatMap((t) => t.boePowers);
    if (selectedTarifa === "all") return allPowers;
    if (selectedTarifa === "") return [];
    return allPowers.filter(
      (p) => p.tariffId.toString() === selectedTarifa
    );
  };

  const preparePeriodoData = (power: BoePower) => {
    const periodsMap = new Map(
      power.periods.map((p) => [p.period, p])
    );

    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const period: BoePowerPeriod =
        periodsMap.get(num) ?? {
          id: -1,
          period: num,
          value: 0,
          boePowerId: power.id,
          boePower: null,
        };

      return {
        period,
        cellId: `boe-power-${power.id}-${num}`,
        isEditing: editingCell === `boe-power-${power.id}-${num}`,
      };
    });
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTariff={selectedTarifa}
        setSelectedTariff={setSelectedTarifa}
        options={tarifas}
        showAll
      />

      {selectedTarifa && (
        <div className="space-y-6">
          {getFilteredData().map((power) => {
            const tariff = tarifas.find(
              (t) => t.id === power.tariffId
            );

            return (
              <div
                key={power.id}
                className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-border flex items-center gap-3">
                  <div className="p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-sidebar-selected-text" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {tariff?.code ?? "Sin código"}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                    Periodos de Potencia BOE
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {preparePeriodoData(power).map(
                      ({ period, cellId, isEditing }) => (
                        <div
                          key={cellId}
                          className="text-center p-4 bg-body rounded-lg group hover:bg-card transition-all duration-200 border border-border relative"
                        >
                          <div
                            className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg mb-3 border ${getPeriodColor(
                              period.period
                            )}`}
                          >
                            P{period.period}
                          </div>

                          <PeriodoCard
                            periodo={period}
                            cellId={cellId}
                            isEditing={isEditing}
                            editValue={editValue}
                            onEditStart={handleEditStart}
                            onEditChange={setEditValue}
                            onEditSave={() =>
                              handleEditSave(period)
                            }
                            onEditCancel={handleEditCancel}
                            onDelete={(p) =>
                              handleDeletePeriodo(
                                p as BoePowerPeriod
                              )
                            }
                            decimals={6}
                          />
                        </div>
                      )
                    )}
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
