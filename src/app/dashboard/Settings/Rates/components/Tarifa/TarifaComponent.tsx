import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { Producto, Tarifa, ProductoPeriodo } from "../../interfaces/proveedor";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { Calculator } from "lucide-react";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";
import {
  createProductoPeriodo,
  deleteProductoPeriodo,
  updateProductoPeriodo,
} from "@/app/services/TarifarioService/producto-periodo.service";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

interface Props {
  token?: string;
}

export const TarifaComponent = ({ token }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [selectedProducto, setSelectedProducto] = useState<string>("");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { setTarifas, tarifas } = useTarifaStore();

  const { showAlert } = useAlertStore();

  const handleEditStart = (cellId: string, value: number) => {
    setEditingCell(cellId);
    setEditValue(value?.toString() ?? "");
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = async (periodo: ProductoPeriodo) => {
    if (!token) {
      showAlert("Sin token", "error");
      return;
    }

    const valor = parseFloat(editValue);
    if (isNaN(valor)) return;

    try {
      if (periodo.id === -1) {
        // Crear periodo
        const response = await createProductoPeriodo(token, {
          productoId: periodo.productoId,
          periodo: periodo.periodo,
          valor,
          producto: null,
        });

        if (response.isSuccess) {
          showAlert("Período agregado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              productos: tarifa.productos.map((prod) =>
                prod.id === periodo.productoId
                  ? {
                      ...prod,
                      periodos: [
                        ...prod.periodos.filter(
                          (p) => p.periodo !== periodo.periodo
                        ),
                        { ...periodo, id: response.result.id, valor },
                      ],
                    }
                  : prod
              ),
            }))
          );
        }
      } else {
        // Actualizar periodo
        const response = await updateProductoPeriodo(token, periodo.id, {
          ...periodo,
          valor,
        });

        if (response.isSuccess) {
          showAlert("Período actualizado correctamente", "success");
          setTarifas(
            tarifas.map((tarifa) => ({
              ...tarifa,
              productos: tarifa.productos.map((prod) =>
                prod.id === periodo.productoId
                  ? {
                      ...prod,
                      periodos: prod.periodos.map((p) =>
                        p.id === periodo.id ? { ...p, valor } : p
                      ),
                    }
                  : prod
              ),
            }))
          );
        }
      }
    } catch (error) {
      showAlert("Error al guardar período", "error");
      console.error(error);
    }

    setEditingCell(null);
    setEditValue("");
  };

  // Eliminar periodo
  const handleDeletePeriodo = async (periodo: ProductoPeriodo) => {
    if (!periodo.id || !token) {
      showAlert("No se puede eliminar o no existe token", "error");
      return;
    }

    try {
      const response = await deleteProductoPeriodo(token, periodo.id);
      if (response.isSuccess) {
        showAlert("Período eliminado correctamente", "success");
        setTarifas(
          tarifas.map((tarifa) => ({
            ...tarifa,
            productos: tarifa.productos.map((prod) =>
              prod.id === periodo.productoId
                ? {
                    ...prod,
                    periodos: prod.periodos.filter((p) => p.id !== periodo.id),
                  }
                : prod
            ),
          }))
        );
      }
    } catch (error) {
      showAlert("Error al eliminar período", "error");
      console.error(error);
    }
    setEditingCell(null);
    setEditValue("");
  };

  // Filtrar datos
  const getFilteredData = (): Tarifa[] => {
    let result = tarifas;

    if (selectedTarifa !== "all" && selectedTarifa !== "") {
      result = result.filter((t) => t.id.toString() === selectedTarifa);
    }

    if (selectedProducto !== "" && selectedProducto !== "all") {
      result = result.map((t) => ({
        ...t,
        productos: t.productos.filter(
          (p) => p.id.toString() === selectedProducto
        ),
      }));
    }

    return result;
  };

  // Preparar datos de períodos
  const preparePeriodoData = (producto: Producto) => {
    const periodosMap = new Map(producto.periodos.map((p) => [p.periodo, p]));
    return Array.from({ length: 6 }, (_, i) => {
      const num = i + 1;
      const periodo: ProductoPeriodo = periodosMap.get(num) ?? {
        id: -1,
        productoId: producto.id,
        periodo: num,
        valor: null,
        producto: null,
      };

      return {
        periodo,
        cellId: `producto-${producto.id}-${num}`,
        isEditing: editingCell === `producto-${producto.id}-${num}`,
      };
    });
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTarifa={selectedTarifa}
        setSelectedTarifa={setSelectedTarifa}
        selectedProducto={selectedProducto}
        setSelectedProducto={setSelectedProducto}
        options={tarifas.map((t) => ({
          id: t.id,
          codigo: t.codigo,
          productos: t.productos.map((p) => ({ id: p.id, nombre: p.nombre })),
        }))}
        showAll
      />

      {selectedTarifa && (
        <div className="space-y-6">
          {getFilteredData().map((tarifa) =>
            tarifa.productos.map((producto) => {
              const periodosRender = preparePeriodoData(producto);

              return (
                <div
                  key={producto.id}
                  className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-border flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-sidebar-selected-text" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {tarifa.codigo}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {producto.nombre}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-4">
                      Períodos (€/kWh)
                    </p>
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
                              handleDeletePeriodo(p as ProductoPeriodo)
                            }
                            decimals={6}
                          />
                        </div>
                      ))}
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
