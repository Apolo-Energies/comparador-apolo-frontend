import { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { TrendingUp } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import {
  OmieDistribution,
  OmieDistributionPeriod,
} from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import { useAlertStore } from "@/app/store/ui/alert.store";
import {
  createRepartoOmiePeriodo,
  deleteRepartoOmiePeriodo,
  updateRepartoOmiePeriodo,
} from "@/app/services/TarifarioService/reparto-omi-periodo.service";
import { useTariffStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const RepartoComponent = ({ token }: Props) => {
  const [selectedTariff, setSelectedTariff] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { showAlert } = useAlertStore();
  const tariffs = useTariffStore((state) => state.tariffs);
  const setTariffs = useTariffStore((state) => state.setTariffs);

  const handleEditStart = (cellId: string, value: number): void => {
    setEditingCell(cellId);
    setEditValue(isNaN(value) ? "" : value.toString());
  };

  const handleEditCancel = (): void => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = async (period: OmieDistributionPeriod) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const factor = parseFloat(editValue);
    if (isNaN(factor)) return;

    try {
      if (period.id === -1) {
        const response = await createRepartoOmiePeriodo(token, {
          omieDistributionId: period.omieDistributionId,
          period: period.period,
          factor,
          omieDistribution: null,
        });

        if (response.isSuccess) {
          showAlert("Agregado correctamente", "success");
          setTariffs(
            tariffs.map((tariff) => ({
              ...tariff,
              omieDistributions: tariff.omieDistributions.map((d) =>
                d.id === period.omieDistributionId
                  ? {
                      ...d,
                      periods: [
                        ...d.periods.filter(
                          (p) => p.period !== period.period
                        ),
                        { ...period, id: response.result.id, factor },
                      ],
                    }
                  : d
              ),
            }))
          );
        }
      } else {
        const response = await updateRepartoOmiePeriodo(token, period.id, {
          ...period,
          factor,
        });

        if (response.isSuccess) {
          showAlert("Actualizado correctamente", "success");
          setTariffs(
            tariffs.map((tariff) => ({
              ...tariff,
              omieDistributions: tariff.omieDistributions.map((d) =>
                d.id === period.omieDistributionId
                  ? {
                      ...d,
                      periods: d.periods.map((p) =>
                        p.id === period.id ? { ...p, factor } : p
                      ),
                    }
                  : d
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

  const handleDeletePeriodo = async (period: OmieDistributionPeriod) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    try {
      const response = await deleteRepartoOmiePeriodo(token, period.id);
      if (response.isSuccess) {
        showAlert("Eliminado correctamente", "success");
        setTariffs(
          tariffs.map((tariff) => ({
            ...tariff,
            omieDistributions: tariff.omieDistributions.map((d) =>
              d.id === period.omieDistributionId
                ? {
                    ...d,
                    periods: d.periods.filter(
                      (p) => p.id !== period.id
                    ),
                  }
                : d
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

  const getFilteredData = (): OmieDistribution[] => {
    const allDistributions = tariffs.flatMap(
      (t) => t.omieDistributions
    );
    if (selectedTariff === "all") return allDistributions;
    if (selectedTariff === "") return [];
    return allDistributions.filter(
      (d) => d.tariffId.toString() === selectedTariff
    );
  };

  const preparePeriodoData = (distribution: OmieDistribution) => {
    const periodsMap = new Map(
      distribution.periods.map((p) => [p.period, p])
    );

    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const period: OmieDistributionPeriod =
        periodsMap.get(num) ?? {
          id: -1,
          period: num,
          factor: 0,
          omieDistributionId: distribution.id,
          omieDistribution: null,
        };

      return {
        period,
        cellId: `omie-${distribution.id}-${num}`,
        isEditing: editingCell === `omie-${distribution.id}-${num}`,
      };
    });
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTariff={selectedTariff}
        setSelectedTariff={setSelectedTariff}
        options={tariffs}
        showAll
      />

      {selectedTariff && (
        <div className="space-y-6">
          {getFilteredData().map((distribution) => (
            <div
              key={distribution.id}
              className="bg-card border-r rounded-lg border border-border shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-sidebar-selected-text" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {
                        tariffs.find(
                          (t) => t.id === distribution.tariffId
                        )?.code
                      }
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {distribution.periodName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                  Distribution Factors
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {preparePeriodoData(distribution).map(
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
                          onEditSave={() => handleEditSave(period)}
                          onEditCancel={handleEditCancel}
                          onDelete={(p) =>
                            handleDeletePeriodo(
                              p as OmieDistributionPeriod
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
          ))}
        </div>
      )}
    </div>
  );
};
