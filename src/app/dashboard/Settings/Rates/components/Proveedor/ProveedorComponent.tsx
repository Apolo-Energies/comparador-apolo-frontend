import React from "react";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

export const ProveedorComponent = () => {
  const { proveedorActual } = useTarifaStore();

  return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Botón comentado para futuras acciones */}
        {/* <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <Plus size={14} />
          Agregar Proveedor
        </button> */}
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-foreground">
                {proveedorActual?.nombre || "Sin proveedor seleccionado"}
              </h4>
              <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-lg bg-green-100 text-green-800">
                Activo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <div className="bg-body p-6 rounded-lg flex flex-col justify-between">
              <div className="font-medium text-foreground mb-2">
                Tarifas registradas
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground text-center">
                {proveedorActual?.tarifas.length || 0}
              </div>
            </div>

            <div className="bg-body p-6 rounded-lg flex flex-col justify-between">
              <div className="font-medium text-foreground mb-2">Estado</div>
              <div className="text-lg md:text-xl font-semibold text-green-600 text-center">
                Operativo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
