import React from "react";

interface TarifaOption {
  id: number;
  codigo: string;
  productos?: { id: number; nombre: string }[];
}

interface Props {
  selectedTarifa: string;
  setSelectedTarifa: (value: string) => void;
  selectedProducto?: string; // opcional
  setSelectedProducto?: (value: string) => void; // opcional
  options: TarifaOption[];
  showAll?: boolean;
}

export const TarifaSelector = ({
  selectedTarifa,
  setSelectedTarifa,
  selectedProducto,
  setSelectedProducto,
  options,
  showAll = false,
}: Props) => {
  const selectedTarifaObj = options.find(
    (tarifa) => tarifa.id.toString() === selectedTarifa
  );

  const hasProductos =
    selectedTarifaObj?.productos && selectedTarifaObj.productos.length > 0 && setSelectedProducto;

  return (
    <div className="bg-card border-r border-border rounded-lg shadow-sm p-4 mb-6">
      <div className={hasProductos ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1"}>
        {/* Selector de tarifa */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Seleccionar Tarifa
          </label>
          <select
            value={selectedTarifa}
            onChange={(e) => {
              setSelectedTarifa(e.target.value);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              setSelectedProducto && setSelectedProducto("");
            }}
            className="w-full px-3 py-2 border bg-input border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {showAll && <option value="all">Mostrar todos</option>}
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.codigo}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de producto (si existe) */}
        {hasProductos && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Seleccionar Producto
            </label>
            <select
              value={selectedProducto}
              onChange={(e) => setSelectedProducto!(e.target.value)}
              className="w-full px-3 py-2 border bg-input border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona un producto</option>
              {selectedTarifaObj!.productos!.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
