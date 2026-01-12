"use client";
import {
  changeUserRole,
  deactivateUser,
  getUsers,
  updateProveedor,
} from "@/app/services/UserService/user.service";
import React, { useEffect, useMemo, useState } from "react";
import { User, UserCommission } from "../../interfaces/user";
import { useSession } from "next-auth/react";
import { Column, DataTable } from "@/components/ui/DataTable";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { Commission } from "@/app/dashboard/Settings/Comision/interfaces/commission";
import {
  assignCommission,
  getCommissions,
} from "@/app/services/ComisionService/comision.service";
import { SelectOptions } from "@/components/Selects/SelectOptions";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { getProveedores } from "@/app/services/TarifarioService/proveedor.service";
import { Proveedor } from "../../../Rates/interfaces/proveedor";
import { ArrowUpDownIcon } from '@/incons/ArrowUpDownIcon';

interface Props {
  filters: {
    nombre: string;
    email: string;
    role: string;
  };
}

export const TableUsers = ({ filters }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [commissionOptions, setCommissionOptions] = useState<Commission[]>([]);
  const [providersOptions, setProvidersOptions] = useState<Proveedor[]>([]);
  const { data: session /*status*/ } = useSession();
  const { setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();
  const { reloadFlag } = useReloadStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (!session?.user.token) {
          return;
        }
        // Traer usuarios
        const usersResponse = await getUsers(session.user.token);
        if (usersResponse.status === 200) setUsers(usersResponse.result);

        // Traer comisiones
        const commissionsResponse = await getCommissions(session.user.token);
        if (commissionsResponse.status === 200)
          setCommissionOptions(commissionsResponse.result);

        // Traer proveedores
        const providersResponse = await getProveedores(session.user.token);
        if (commissionsResponse.status === 200)
          setProvidersOptions(providersResponse.result);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, reloadFlag]);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const matchesName = user.nombreCompleto
        .toLowerCase()
        .includes(filters.nombre.toLowerCase());
      const matchesEmail = user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());
      const matchesRole =
        filters.role === "" || user.role.toString() === filters.role;
      return matchesName && matchesEmail && matchesRole;
    });
  }, [users, filters]);

  const registerComision = async (userId: string, commissionId: string) => {
    try {
      if (!userId || !commissionId || !session?.user.token) return;
      // Llamada al backend para asignar la comisión
      const response = await assignCommission(session.user.token, {
        userId,
        commissionId,
      });
      if (response.status === 200) {
        showAlert("Comisión actualizada correctamente", "success");
      } else {
        showAlert("Error al actualizar la comisión", "error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlert("Error al actualizar la comisión", "error");
    }
  };

  const registerProvider = async (userId: string, proveedorId: number) => {
    try {
      if (!userId || !proveedorId || !session?.user.token) return;
      // Llamada al backend para asignar la comisión
      const response = await updateProveedor(
        session.user.token,
        userId,
        proveedorId
      );
      if (response.status === 200) {
        showAlert("Proveedor actualizada correctamente", "success");
      } else {
        showAlert("Error al actualizar la proveedor", "error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlert("Error al actualizar la proveedor", "error");
    }
  };

  const handleCommissionChange = (userId: string, commissionId: string) => {
    const selected = commissionOptions.find((c) => c.id === commissionId);
    if (!selected) return;

    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
            ...user,
            commissionId: selected.id,
            commissions: selected.percentage,
            userCommissions: [
              {
                id: user.userCommissions?.[0]?.id ?? "",
                commissionType: {
                  ...selected,
                  id: selected.id ?? "",
                  name: selected.name ?? "",
                  percentage: selected.percentage ?? 0,
                },
              },
            ] as UserCommission[],
          }
          : user
      )
    );
    registerComision(userId, commissionId);
  };

  const handleProviderChange = (userId: string, providerId: number) => {
    const selected = providersOptions.find((c) => c.id === providerId);
    if (!selected) return;

    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
            ...user,
            proveedorId: selected.id,
            commissionId: selected.id,
          }
          : user
      )
    );

    // Llamada al backend para persistir el cambio de proveedor
    registerProvider(userId, providerId);
  };

  const updateUserRole = async (userId: string, newRole: number) => {
    if (!session?.user.token) return;

    try {
      const response = await changeUserRole(
        session.user.token,
        userId,
        newRole
      );
      if (response.isSuccess) {
        showAlert("Rol actualizado correctamente", "success");
        // Actualizamos estado local para reflejar el cambio en la UI
        setUsers(
          users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        showAlert("Error al actualizar el rol", "error");
      }
    } catch (error) {
      showAlert("Error al actualizar el rol", "error");
      console.error(error);
    }
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    if (!session?.user.token) return;

    try {
      const response = await deactivateUser(
        session.user.token,
        userId,
        isActive
      );
      if (response.isSuccess) {
        showAlert("Estado actualizado correctamente", "success");
        // Actualizamos estado local
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, estadoActivo: isActive } : u
          )
        );
      } else {
        showAlert("Error al actualizar el estado", "error");
      }
    } catch (error) {
      showAlert("Error al actualizar el estado", "error");
      console.error(error);
    }
  };

  const columns: Column<User>[] = [
    {
      key: "nombreCompleto",
      label: "Usuario",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <div className="flex items-center">
          {/* <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
            {user.nombreCompleto
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div> */}
          <div className="ml-4 text-sm font-medium text-accent-foreground">
            {user.nombreCompleto}
          </div>
        </div>
      ),
    },
    { key: "email", headerIcon: <ArrowUpDownIcon />, label: "Email" },
    {
      key: "role",
      label: "Rol",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <SelectOptions
          value={user.role.toString()}
          options={[
            { id: "1", name: "Master" },
            { id: "2", name: "Colaborador" },
          ]}
          onChange={(val) =>
            updateUserRole(user.id as string, Number(val))
          }
        />
      ),
    },
    {
      key: "estadoActivo",
      label: "Estado",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <SelectOptions
          value={String(user.estadoActivo)}
          options={[
            { id: "true", name: "Activo" },
            { id: "false", name: "Inactivo" },
          ]}
          onChange={(val) =>
            updateUserStatus(user.id as string, val === "true")
          }
        />
      ),
    },
    {
      key: "commissions",
      label: "Comisión",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <SelectOptions
          value={user.userCommissions?.[0]?.commissionType?.id ?? ""}
          options={commissionOptions.map((c) => ({
            id: c.id ?? "",
            name: c.name
          }))}
          onChange={(val) => handleCommissionChange(user.id as string, val)}
        />
      ),
    },
    {
      key: "providers",
      label: "Proveedor",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <SelectOptions
          value={user.proveedorId ?? ""}
          options={providersOptions.map((p) => ({
            id: p.id,
            name: p.nombre,
          }))}
          onChange={(val) =>
            handleProviderChange(user.id as string, Number(val))
          }
        />
      ),
    },
  ];

  return <DataTable data={filteredUsers} columns={columns} rowKey="id" borderTop={false} roundedTopLeft={false} roundedBottomRight={false} />;
};
