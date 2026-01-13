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
import { Provider } from "../../interfaces/proveedor";
import { TarifaComponent } from "../Tarifa/TarifaComponent";
import { useTariffStore } from "@/app/store/tarifario/tarifa.store";

export const TarifarioComponent = () => {
  const [selectedTab, setSelectedTab] = useState("proveedor");
  const [providers, setProviders] = useState<Provider[]>([]);

  const {
    currentProvider,
    setCurrentProvider,
    tariffs,
    setTariffs,
  } = useTariffStore();

  const { data: session, status } = useSession();
  const { setLoading } = useLoadingStore();
  const { reloadFlag } = useReloadStore();

  useEffect(() => {
    const fetchProviders = async () => {
      if (!session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedores(session.user.token);
        if (response.isSuccess) {
          setProviders(response.result);

          if (response.result.length > 0) {
            setCurrentProvider(response.result[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchProviders();
  }, [session?.user.token, reloadFlag, status, setLoading, setCurrentProvider]);

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!currentProvider || !session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedorById(
          currentProvider.id,
          session.user.token
        );
        if (response.isSuccess && response.result) {
          setTariffs(response.result.tariffs || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [currentProvider, session?.user.token, setLoading, setTariffs]);

  return (
    <div className="min-h-screen bg-body">
      <div className="mx-auto space-y-1">
        <TarifarioHeader
          proveedores={providers}
          selectedProveedor={currentProvider}
          setSelectedProveedor={setCurrentProvider}
          token={session?.user.token}
        />

        <NavigatorTop
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === "proveedor" && currentProvider && (
          <ProveedorComponent />
        )}

        {selectedTab === "tarifas" && tariffs.length > 0 && (
          <TarifaComponent token={session?.user.token} />
        )}

        {selectedTab === "reparto" && tariffs.length > 0 && (
          <RepartoComponent token={session?.user.token} />
        )}

        {selectedTab === "potencia" && tariffs.length > 0 && (
          <PotenciaComponent token={session?.user.token} />
        )}
      </div>
    </div>
  );
};
