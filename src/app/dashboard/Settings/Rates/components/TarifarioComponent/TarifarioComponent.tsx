"use client";

import { useEffect, useState } from "react";
import { TarifarioHeader } from "../Header/TarifarioHeader";
import { ProveedorComponent } from "../Proveedor/ProveedorComponent";
import { NavigatorTop } from "../Navigator/NavigatorTop";
import { RepartoComponent } from "../Reparto/RepartoComponent";
import { PotenciaComponent } from "../Potencia/PotenciaComponent";
import {
  getProveedores,
  getProveedorById,
} from "@/app/services/TarifarioService/proveedor.service";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { Proveedor } from "../../interfaces/proveedor";
import { TarifaComponent } from "../Tarifa/TarifaComponent";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

export const TarifarioComponent = () => {
  const [selectedTab, setSelectedTab] = useState("proveedor");
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const { setProveedorActual, setTarifas } = useTarifaStore();

  const { data: session, status } = useSession();
  const { setLoading } = useLoadingStore();
  const { reloadFlag } = useReloadStore();

  // Cargar lista de proveedores al montar
  useEffect(() => {
    const fetchProveedores = async () => {
      if (!session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedores(session.user.token);
        if (response.isSuccess) {
          setProveedores(response.result);

          if (response.result.length > 0) {
            setProveedorActual(response.result[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchProveedores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, reloadFlag]);

  const proveedorActual = useTarifaStore((state) => state.proveedorActual);

  useEffect(() => {
    const fetchProveedorData = async () => {
      if (!proveedorActual || !session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedorById(
          proveedorActual.id,
          session.user.token
        );
        if (response.isSuccess && response.result) {
          setTarifas(response.result.tarifas || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProveedorData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proveedorActual, session?.user.token]);

  const tarifas = useTarifaStore((state) => state.tarifas);

  return (
    <div className="min-h-screen bg-body">
      <div className="mx-auto space-y-1">
        <TarifarioHeader
          proveedores={proveedores}
          selectedProveedor={proveedorActual}
          setSelectedProveedor={setProveedorActual}
          token={session?.user.token}
        />

        <NavigatorTop
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === "proveedor" && proveedorActual && (
          <ProveedorComponent />
        )}

        {selectedTab === "tarifas" && tarifas.length > 0 && (
          <TarifaComponent token={session?.user.token} />
        )}

        {selectedTab === "reparto" && tarifas.length > 0 && (
          <RepartoComponent token={session?.user.token} />
        )}

        {selectedTab === "potencia" && tarifas.length > 0 && (
          <PotenciaComponent token={session?.user.token} />
        )}
      </div>
    </div>
  );
};
