"use client";
import {
  changeUserEnergyExpert,
  changeUserRole,
  deactivateUser,
  deleteUser,
  getUsersByFilters,
  updateProveedor,
} from "@/app/services/UserService/user.service";
import React, { useEffect, useState } from "react";
import { User, UserCommission } from "../../interfaces/user";
import { useSession } from "next-auth/react";
import { Column, DataTable } from "@/components/ui/DataTable";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { assignCommission } from "@/app/services/ComisionService/comision.service";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { CatalogItem, getCatalog } from "@/app/services/CatalogService/catalog.service";
import { ArrowUpDownIcon } from '@/incons/ArrowUpDownIcon';
import { Paginator } from "@/components/ui/Paginator";
import { UserActionsMenu } from "../Actions/UserActionsMenu";
import { getSignatureStatusLabel } from "@/utils/signaturit/utilitySignaturit";
import { UserFilter } from "../../interfaces/user-filters";
import { UserRoleLabel } from "@/utils/user-role/user-role";
import { UserRole } from "../../enums/user-role.enum";
import Link from "next/link";
import { EyeIcon, Trash2 } from "lucide-react";
import { ModalDeleteUser } from "../Modals/ModalDeleteUser";

interface Props {
  filters: UserFilter;
}

export const TableUsers = ({ filters }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [commissionOptions, setCommissionOptions] = useState<CatalogItem[]>([]);
  const [providersOptions, setProvidersOptions] = useState<CatalogItem[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
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

        // Traer catálogo (proveedores + comisiones)
        const catalogResponse = await getCatalog(session.user.token);
        if (catalogResponse.isSuccess) {
          setCommissionOptions(catalogResponse.result.commissions);
          setProvidersOptions(catalogResponse.result.providers);
        }
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
                  id: selected.id ?? "",
                  name: selected.name ?? "",
                  percentage: 0,
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
    const selected = providersOptions.find((c) => String(c.id) === String(providerId));
    if (!selected) return;

    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, providerId: Number(selected.id) }
          : user
      )
    );

    registerProvider(userId, providerId);
  };

  const updateEnergyExpert = async (userId: string, isEnergyExpert: boolean) => {
    if (!session?.user.token) return;

    try {
      const response = await changeUserEnergyExpert(
        session.user.token,
        userId,
        isEnergyExpert
      );

      if (response.isSuccess) {
        showAlert("Energy expert actualizado correctamente", "success");

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, isEnergyExpert } : u
          )
        );
      } else {
        showAlert("Error al actualizar Energy expert", "error");
      }
    } catch (error) {
      showAlert("Error al actualizar Energy expert", "error");
      console.error(error);
    }
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

  const confirmDeleteUser = async () => {
    if (!session?.user.token || !userToDelete) return;

    try {
      const response = await deleteUser(session.user.token, userToDelete.id);
      if (response.isSuccess) {
        showAlert("Usuario eliminado correctamente", "success");
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      } else {
        showAlert(response.errorMessages?.[0] ?? "Error al eliminar el usuario", "error");
      }
    } catch (error) {
      showAlert("Error al eliminar el usuario", "error");
      console.error(error);
    } finally {
      setUserToDelete(null);
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
    { key: "identifier", headerIcon: <ArrowUpDownIcon />, label: "SIPS/DNI", },
    { key: "email", headerIcon: <ArrowUpDownIcon />, label: "Usuario" },
    { key: "phone", headerIcon: <ArrowUpDownIcon />, label: "Teléfono" },
    {
      key: "role",
      label: "Rol",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span className="text-sm">
          {UserRoleLabel[user.role as UserRole]}
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
      key: "isEnergyExpert",
      label: "Energy Expert",
      align: "center",
      headerIcon: <ArrowUpDownIcon />,
      render: (user: User) => (
        <span
          className={`text-sm font-medium ${user.isEnergyExpert
            ? "text-success"
            : "text-destructive"
            }`}
        >
          {user.isEnergyExpert ? "Sí" : "No"}
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
              (p) => String(p.id) === String(user.providerId)
            )?.name ?? "Sin Proveedor"
          }
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
      key: "actions",
      label: "",
      align: "center",
      render: (user: User) => (
        <div className="flex justify-center items-center w-full gap-1">
          <Link href={`/dashboard/Settings/Users/${user.id}`}>
            <EyeIcon className="w-4.5 h-4.5 hover:text-primary/80 transition-colors cursor-pointer" />
          </Link>
          <button
            onClick={() => setUserToDelete(user)}
            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <UserActionsMenu
            user={user}
            commissionOptions={commissionOptions}
            providersOptions={providersOptions}
            onEnergyExpertChange={updateEnergyExpert}
            onRoleChange={updateUserRole}
            onStatusChange={updateUserStatus}
            onCommissionChange={handleCommissionChange}
            onProviderChange={handleProviderChange}
          />
        </div>
      ),

    }

  ];

  return (
    <>
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

      <ModalDeleteUser
        open={!!userToDelete}
        userName={userToDelete?.fullName ?? ""}
        onConfirm={confirmDeleteUser}
        onClose={() => setUserToDelete(null)}
      />
    </>
  )
};
