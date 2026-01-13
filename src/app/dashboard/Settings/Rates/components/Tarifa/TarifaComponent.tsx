import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { Product, Tariff, ProductPeriod } from "../../interfaces/proveedor";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { Calculator } from "lucide-react";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import {
  createProductoPeriodo,
  deleteProductoPeriodo,
  updateProductoPeriodo,
} from "@/app/services/TarifarioService/producto-periodo.service";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useTariffStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const TarifaComponent = ({ token }: Props) => {
  const [selectedTariff, setSelectedTariff] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { setTariffs, tariffs } = useTariffStore();
  const { showAlert } = useAlertStore();

  const handleEditStart = (cellId: string, value: number) => {
    setEditingCell(cellId);
    setEditValue(value?.toString() ?? "");
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = async (period: ProductPeriod) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const value = parseFloat(editValue);
    if (isNaN(value)) return;

    try {
      if (period.id === -1) {
        const response = await createProductoPeriodo(token, {
          productId: period.productId,
          period: period.period,
          value,
          product: null,
        });

        if (response.isSuccess) {
          showAlert("Periodo agregado correctamente", "success");
          setTariffs(
            tariffs.map((tariff) => ({
              ...tariff,
              products: tariff.products.map((prod) =>
                prod.id === period.productId
                  ? {
                    ...prod,
                    periods: [
                      ...prod.periods.filter(
                        (p) => p.period !== period.period
                      ),
                      { ...period, id: response.result.id, value },
                    ],
                  }
                  : prod
              ),
            }))
          );
        }
      } else {
        const response = await updateProductoPeriodo(token, period.id, {
          ...period,
          value,
        });

        if (response.isSuccess) {
          showAlert("Periodo actualizado correctamente", "success");
          setTariffs(
            tariffs.map((tariff) => ({
              ...tariff,
              products: tariff.products.map((prod) =>
                prod.id === period.productId
                  ? {
                    ...prod,
                    periods: prod.periods.map((p) =>
                      p.id === period.id ? { ...p, value } : p
                    ),
                  }
                  : prod
              ),
            }))
          );
        }
      }
    } catch (error) {
      showAlert("Error al guardar periodo", "error");
      console.error(error);
    }

    setEditingCell(null);
    setEditValue("");
  };

  const handleDeletePeriodo = async (period: ProductPeriod) => {
    if (!period.id || !token) {
      showAlert("No se puede eliminar", "error");
      return;
    }

    try {
      const response = await deleteProductoPeriodo(token, period.id);
      if (response.isSuccess) {
        showAlert("Periodo eliminado correctamente", "success");
        setTariffs(
          tariffs.map((tariff) => ({
            ...tariff,
            products: tariff.products.map((prod) =>
              prod.id === period.productId
                ? {
                  ...prod,
                  periods: prod.periods.filter(
                    (p) => p.id !== period.id
                  ),
                }
                : prod
            ),
          }))
        );
      }
    } catch (error) {
      showAlert("Error al eliminar periodo", "error");
      console.error(error);
    }

    setEditingCell(null);
    setEditValue("");
  };

  const getFilteredData = (): Tariff[] => {
    let result = tariffs;

    if (selectedTariff !== "all" && selectedTariff !== "") {
      result = result.filter(
        (t) => t.id.toString() === selectedTariff
      );
    }

    if (selectedProduct !== "" && selectedProduct !== "all") {
      result = result.map((t) => ({
        ...t,
        products: t.products.filter(
          (p) => p.id.toString() === selectedProduct
        ),
      }));
    }

    return result;
  };

  const preparePeriodoData = (product: Product) => {
    const periodsMap = new Map(
      product.periods.map((p) => [p.period, p])
    );

    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const period: ProductPeriod =
        periodsMap.get(num) ?? {
          id: -1,
          productId: product.id,
          period: num,
          value: 0,
          product: null,
        };

      return {
        period,
        cellId: `product-${product.id}-${num}`,
        isEditing: editingCell === `product-${product.id}-${num}`,
      };
    });
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTariff={selectedTariff}
        setSelectedTariff={setSelectedTariff}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        options={tariffs}
        showAll
      />

      {selectedTariff && (
        <div className="space-y-6">
          {getFilteredData().map((tariff) =>
            tariff.products.map((product) => {
              const periodosRender = preparePeriodoData(product);

              console.log("Rendering product:", periodosRender);

              return (
                <div
                  key={product.id}
                  className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-border flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-sidebar-selected-text" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {tariff.code}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {product.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-4">
                      Periods (€/kWh)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {periodosRender.map(
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
                                  p as ProductPeriod
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
            })
          )}
        </div>
      )}
    </div>
  );
};
