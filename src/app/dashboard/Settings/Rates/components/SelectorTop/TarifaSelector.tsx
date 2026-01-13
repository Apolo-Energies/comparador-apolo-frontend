import React from "react";

interface TariffOption {
  id: number;
  code: string;
  products?: { id: number; name: string }[];
}

interface Props {
  selectedTariff: string;
  setSelectedTariff: (value: string) => void;
  selectedProduct?: string;
  setSelectedProduct?: (value: string) => void;
  options: TariffOption[];
  showAll?: boolean;
}


export const TarifaSelector = ({
  selectedTariff,
  setSelectedTariff,
  selectedProduct,
  setSelectedProduct,
  options,
  showAll = false,
}: Props) => {
  const selectedTariffObj = options.find(
    (tariff) => tariff.id.toString() === selectedTariff
  );

  const hasProducts =
    selectedTariffObj?.products && selectedTariffObj.products.length > 0 && setSelectedProduct;     
  return (
    <div className="bg-card border-r border-border rounded-lg shadow-sm p-4 mb-6">
      <div className={hasProducts ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1"}>
        {/* Selector de tarifa */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Seleccionar Tarifa
          </label>
          <select
            value={selectedTariff}
            onChange={(e) => {
              setSelectedTariff(e.target.value);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              setSelectedProduct && setSelectedProduct("");
            }}
            className="w-full px-3 py-2 border bg-input border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {showAll && <option value="all">Mostrar todos</option>}
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de producto (si existe) */}
        {hasProducts && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Seleccionar Producto
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct!(e.target.value)}
              className="w-full px-3 py-2 border bg-input border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona un producto</option>
              {selectedTariffObj!.products!.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
