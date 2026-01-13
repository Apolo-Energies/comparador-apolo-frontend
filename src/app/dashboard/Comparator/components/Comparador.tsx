"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/buttons/button";
import { DropzoneUpload } from "./upload/DropzoneUpload";
import { ComparadorFormModal } from "./modals/ComparadorFormModal";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { subirYProcesarDocumento } from "@/app/services/MatilService/ocr.service";
import { getTipoArchivo } from "@/utils/typeFile";
import { useSession } from "next-auth/react";
import { getProveedorByUser } from "@/app/services/TarifarioService/proveedor.service";
import { OcrData } from "../../Analytics/interfaces/matilData";
import { getSelectUsers } from "@/app/services/UserService/user.service";
import { UserSelect } from "../interfaces/user";
import { ComboboxSelect } from "@/components/Selects/ComboboxSelect";
import { useTariffStore } from "@/app/store/tarifario/tarifa.store";

export const Comparador = () => {
  const [matilData, setMatilData] = useState<unknown | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const [users, setUsers] = useState<UserSelect[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSelect["id"] | "">("");

  const [file, setFile] = useState<File | string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();

  const { setTariffs, setCurrentProvider } = useTariffStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTarifas = async () => {
      if (!session?.user?.token) return;

      try {
        const response = await getProveedorByUser(session.user.token);

        if (response.isSuccess && response.result) {
          setCurrentProvider(response.result);
          setTariffs(response.result.tariffs ?? []);
        } else {
          console.error("Error cargando tarifas:", response.errorMessages);
        }
      } catch (err) {
        console.error("Fallo al obtener tarifas:", err);
      }
    };

    const fetchUsers = async () => {
      if (!session?.user?.token) return;

      try {
        const response = await getSelectUsers(session.user.token);

        if (response.isSuccess && response.result) {
          console.log("respuesta usuarios: ", response.result);
          setUsers(mapUsersToSelect(response.result));
        } else {
          console.error("Error cargando tarifas:", response.errorMessages);
        }
      } catch (err) {
        console.error("Fallo al obtener tarifas:", err);
      }
    };
    fetchUsers();
    fetchTarifas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.token]);

  const handleFileSelect = (file: File | string) => {
    setFile(file);
  };


  const handleComparar = async () => {
    if (!file || typeof file === "string") return;

    setLoading(true);
    try {
      const tipo = getTipoArchivo(file);
      const nombre = file.name.split(".")[0];

      const token = session?.user?.token;

      if (!token) {
        showAlert("No se encontró el token de autenticación.", "error");
        setLoading(false);
        return;
      }

      const resultado = await subirYProcesarDocumento(token, file, nombre, tipo, selectedUser);

      setMatilData(resultado?.result?.ocrData);
      setFileId(resultado?.result?.id);
      setOpenModal(true);
      showAlert("Documento procesado correctamente.", "success");
    } catch (error) {
      console.error("Error al analizar documento:", error);
      showAlert("Error al procesar el documento.", "error");
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapUsersToSelect = (data: any[]): UserSelect[] => {
    return data.map((u) => ({
      id: u.id,
      name: u.fullName as string
    }));
  };

  console.log("rol de usuario: ", session?.user.role);

  return (
    <div className="h-auto flex flex-col items-center">
      <Card className="w-full max-w-full rounded-lg px-8 py-8 space-y-6">
        {
          session?.user?.role === "Master" &&
          <ComboboxSelect
            value={selectedUser}
            options={users}
            placeholder="Seleccionar usuario"
            onChange={(value) => setSelectedUser(value)}
            className="w-full"
          />
        }

        <DropzoneUpload onFileSelect={handleFileSelect} />

        <div className="border-t border-gray-200 mt-6 pt-4 flex justify-center">
          <Button
            size="sm"
            onClick={handleComparar}
            disabled={!file}
            variant="default"
          >
            Comparar
          </Button>

        </div>
      </Card>

      <ComparadorFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        matilData={matilData as OcrData | undefined}
        fileId={fileId || ""}
        token={session?.user.token || ""}
      />

    </div>
  );
};
