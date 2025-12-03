import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatValue } from "@/utils/tarifario/formatsColors";
import {
  PotenciasBoePeriodo,
  ProductoPeriodo,
  RepartosOmiePeriodo,
} from "../../interfaces/proveedor";

interface Props {
  periodo: RepartosOmiePeriodo | PotenciasBoePeriodo | ProductoPeriodo;
  cellId: string;
  isEditing: boolean;
  editValue: string;
  onEditStart: (cellId: string, value: number) => void;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDelete?: (periodo: Props["periodo"]) => void;
  decimals?: number;
  unit?: string;
}

export const PeriodoCard = ({
  periodo,
  cellId,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
  decimals = 6,
  unit,
}: Props) => {
  const value =
    "valor" in periodo
      ? periodo.valor
      : "factor" in periodo
      ? periodo.factor
      : null;

  const periodoLabel =
    periodo.periodo != null ? `P${periodo.periodo}` : "Sin período";

  // Modo edición
  if (isEditing) {
    return (
      <div className="space-y-2">
        <input
          type="number"
          step={decimals === 6 ? "0.000001" : "0.0001"}
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          className="w-full text-sm p-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onEditSave();
            if (e.key === "Escape") onEditCancel();
          }}
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onEditSave}
            className="p-1.5 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ✓
          </button>
          <button
            onClick={onEditCancel}
            className="p-1.5 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            ✕
          </button>
          {onDelete && value != null && (
            <button
              onClick={() => onDelete(periodo)}
              className="p-1.5 bg-gray-200 cursor-pointer text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Modo "agregar"
  if (value == null) {
    return (
      <div
        className="flex flex-col bg-input items-center justify-center cursor-pointer p-3 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-body transition"
        onClick={() => onEditStart(cellId, NaN)} 
      >
        <Plus size={20} className="text-accent-foreground" />
        <span className="text-xs text-muted-foreground">Agregar {periodoLabel}</span>
      </div>
    );
  }

  // Modo visual (solo mostrar valor)
  return (
    <div
      className="cursor-text bg-input p-2 rounded-lg hover:bg-body transition"
      onClick={() => onEditStart(cellId, value)}
    >
      <div className="text-lg font-bold text-card-foreground">
        {formatValue(value, decimals)}
      </div>
      {unit && <div className="text-xs text-card-foreground mt-1">{unit}</div>}
    </div>
  );
};
