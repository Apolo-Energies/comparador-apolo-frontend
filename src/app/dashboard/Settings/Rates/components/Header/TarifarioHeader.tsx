import { Download } from "lucide-react";
import React from "react";
import { Proveedor } from "../../interfaces/proveedor";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { downloadExcelByProvId } from "@/app/services/FileService/excel.service";

interface Props {
  // hasChanges: boolean;
  proveedores: Proveedor[];
  selectedProveedor: Proveedor | null;
  setSelectedProveedor: (proveedor: Proveedor | null) => void;
  token?: string
}

export const TarifarioHeader = ({
  // hasChanges,
  proveedores,
  selectedProveedor,
  setSelectedProveedor,
  token
}: Props) => {

  const {showAlert} = useAlertStore()

  const exportExcel = async () => {
    if (!selectedProveedor || !token) {
      showAlert('Sin proveedor o token', "error");
      console.error("Sin proveedor o token");
      return;
    }
    try {

      await downloadExcelByProvId(token, selectedProveedor.id);

    } catch (error) {
      showAlert(`${error}`, "error");
      console.error("Error al descargar el Excel:", error);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Tarifarios</h1>
          <p className="text-muted-foreground mt-1">
            Administra tarifas, reparto OMIE y potencias BOE
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* {hasChanges && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">
            <AlertCircle size={18} />
            <span className="font-medium">Cambios pendientes</span>
          </div>
        )} */}

        <button
          onClick={exportExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={16} />
          Exportar Excel
        </button>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          <select
            value={selectedProveedor?.id || ""}
            onChange={(e) => {
              const proveedor = proveedores.find((p) => p.id === Number(e.target.value)) || null;
              setSelectedProveedor(proveedor ?? null);
            }}
            className="bg-transparent border-0 text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
          >
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
