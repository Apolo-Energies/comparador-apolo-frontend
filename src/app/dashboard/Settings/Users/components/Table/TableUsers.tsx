"use client";
import {
  changeUserRole,
  deactivateUser,
  getUsersByFilters,
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
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { getProveedores } from "@/app/services/TarifarioService/proveedor.service";
import { Provider } from "../../../Rates/interfaces/proveedor";
import { ArrowUpDownIcon } from '@/incons/ArrowUpDownIcon';
import { Paginator } from "@/components/ui/Paginator";
import { UserActionsMenu } from "../Actions/UserActionsMenu";
import { getSignatureStatusLabel } from "@/utils/signaturit/utilitySignaturit";
import { UserFilter } from "../../interfaces/user-filters";

interface Props {
  filters: UserFilter;
}

export const TableUsers = ({ filters }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [commissionOptions, setCommissionOptions] = useState<Commission[]>([]);
  const [providersOptions, setProvidersOptions] = useState<Provider[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10);

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
        const response = await getUsersByFilters(session.user.token, { ...filters, page: currentPage, pageSize });

        if (response.isSuccess) {
          setUsers(response.result.items);
          setCurrentPage(response.result.currentPage);
          setTotalPages(response.result.totalPages || 1);
          setTotalCount(response.result.totalCount || 0);
        }

        // Traer comisiones
        const commissionsResponse = await getCommissions(session.user.token);
        if (commissionsResponse.status === 200)
          setCommissionOptions(commissionsResponse.result);

        // Traer proveedores
        const providersResponse = await getProveedores(session.user.token);
        if (providersResponse.status === 200)
          setProvidersOptions(providersResponse.result);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, filters, currentPage, pageSize, reloadFlag]);

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
            commissions: [
              {
                id: user.commissions?.[0]?.id ?? "",
                commissionType: {
                  ...selected,
                  id: selected.id ?? "",
                  name: selected.name ?? "",
                  percentage: selected.percentage ?? 0,
                  userCommissions: [],
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
            providerId: selected.id,
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
            u.id === userId ? { ...u, isActive: isActive } : u
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
      key: "fullName",
      label: "Razon Social",
      align: "left",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <div className="flex items-center">
          <div className="ml-4 text-sm font-medium text-accent-foreground">
            {user.fullName}
          </div>
        </div>
      ),
    },
    { key: "email", headerIcon: <ArrowUpDownIcon />, label: "Usuario" },
    {
      key: "role",
      label: "Rol",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span className="text-sm">
          {user.role === 1 ? "Master" : "Colaborador"}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Estado Usuario",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span
          className={`text-sm font-medium ${user.isActive
            ? "text-success"
            : "text-destructive"
            }`}
        >
          {user.isActive ? "Activo" : "Inactivo"}
        </span>
      ),
    },

    {
      key: "contractSignatureStatus",
      label: "Estado Contrato",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span className="text-sm font-medium">
    {getSignatureStatusLabel(user.contractSignatureStatus)}
  </span>
      ),
    },

    {
      key: "commissions",
      label: "Comisión",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span className="text-sm">
          {user.commissions?.[0]?.commissionType?.name ?? "-"}
        </span>
      ),
    },
    {
      key: "provider",
      label: "Proveedor",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span className="text-sm">
          {
            providersOptions.find(
              (p) => p.id === user.providerId
            )?.name ?? "Sin Proveedor"
          }
        </span>
      ),
    },

    {
      key: "actions",
      label: "",
      align: "center",
      sticky: true,
      render: (user: User) => (
        <UserActionsMenu
          user={user}
          commissionOptions={commissionOptions}
          providersOptions={providersOptions}
          onRoleChange={updateUserRole}
          onStatusChange={updateUserStatus}
          onCommissionChange={handleCommissionChange}
          onProviderChange={handleProviderChange}
        />
      ),
    }

  ];

  return (
    <div className="flex flex-col">
      <DataTable data={users} columns={columns} rowKey="id" borderTop={false} roundedTopLeft={false} roundedBottomRight={false} />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        borderTop={false}
        roundedTopLeft={false}
        roundedTopRight={false}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  )
};
