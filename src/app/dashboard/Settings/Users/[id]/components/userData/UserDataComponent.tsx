"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card } from "@/components/ui/Card";
import { getUserById } from "@/app/services/UserService/user.service";

import { User } from "../../../interfaces/user";
import { DocumentType } from "../../enums/DocumentType";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { UserDocumentsSection } from "./UserDocumentsSection";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { Button } from "@/components/ui/button";
import { EditUserModal } from "../modals/EditUserModal";
import { CustomerModal } from "../modals/CustomerModal";
import { REQUIRED_DOCUMENTS_BY_PERSON_TYPE } from "../config/doc-by-person";
import { getContractInfo } from "@/utils/contract/contract";
import { UserRole } from "../../../enums/user-role.enum";
import { UserRoleLabel } from "@/utils/user-role/user-role";

export const UserDataComponent = ({ userId }: { userId: string }) => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);

    const { data: session } = useSession();
    const IS_MASTER = session?.user?.role === "Master";

    const [user, setUser] = useState<User | null>(null);
    const { setLoading } = useLoadingStore();
    const { reloadFlag } = useReloadStore();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            try {
                if (!session?.user?.token || !userId) return;

                const response = await getUserById(
                    session.user.token,
                    userId
                );

                if (response.isSuccess) {
                    setUser(response.result);
                } else {
                    console.error("Error al obtener usuario:", response.errorMessages);
                }
            } catch (error) {
                console.error("Error inesperado:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, session?.user?.token, reloadFlag]);

    const personType = user?.customer?.personType;

    const existingDocumentTypes = new Set<DocumentType>(
        (user?.contract?.documents ?? []).map(
            (doc) => doc.documentType as unknown as DocumentType
        )
    );

    const requiredDocuments =
        personType != null
            ? REQUIRED_DOCUMENTS_BY_PERSON_TYPE[personType] ?? []
            : [];

    const missingDocumentTypes = requiredDocuments.filter(
        (documentType: DocumentType) => !existingDocumentTypes.has(documentType)
    );

    const hasMissingDocuments = missingDocumentTypes.length > 0;

    const customerDisplayName =
        user?.customer?.companyName ??
        `${user?.customer?.firstName ?? ""} ${user?.customer?.lastName ?? ""}`.trim() ??
        "-";

    const customerDocument = user?.customer?.dni ?? user?.customer?.cif ?? "-";
    const hasCustomer = !!user?.customer;

    const customerType =
        user?.customer?.personType === 0 ? "Individual" : "Empresa";

    const contractInfo = getContractInfo(
        user?.contract?.endDate
    );

    const contractStatus = user?.contract?.isActive ? "Activo" : "Inactivo";

    return (
        <div className="mx-auto w-full space-y-6">

            {!IS_MASTER && hasMissingDocuments && (
                <div
                    className="flex items-center gap-3 rounded-lg p-4"
                    style={{
                        backgroundColor: "var(--color-alert-pending-bg)",
                        color: "var(--color-alert-pending-text)",
                    }}
                >
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <p className="text-sm font-medium">
                        Tienes documentación pendiente por actualizar. Revisa los
                        documentos marcados como rechazados o pendientes.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 text-base font-semibold text-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Datos Personales
                        </p>

                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => setShowCustomerModal(true)}
                        >
                            <Pencil className="h-4 w-4" />
                            {hasCustomer ? "Editar" : "Agregar"}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {[
                            ["Nombre / Razón social", customerDisplayName || "-"],
                            ["DNI / CIF", customerDocument],
                            ["Tipo de cliente", customerType],
                            ["Correo", user?.customer?.email ?? "-"],
                            ["Teléfono", user?.customer?.phone ?? "-"],
                            ["Dirección legal", user?.customer?.legalAddress ?? "-"],
                            ["Dirección notificación", user?.customer?.notificationAddress ?? "-"],
                            ["Estado contrato", contractStatus],
                            ["Vigencia", contractInfo?.label ?? "-"],
                        ].map(([label, value]) => (
                            <div key={label} className="flex items-baseline justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                    {label}
                                </span>
                                <span className="text-sm text-foreground">{value}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 text-base font-semibold text-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Datos de Usuario
                        </p>

                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => setShowUserModal(true)}
                        >
                            <Pencil className="h-4 w-4" />
                            Editar
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {[
                            ["Nombre completo", user?.fullName ?? "-"],
                            ["Correo de acceso", user?.email ?? "-"],
                            ["Teléfono", user?.phone ?? "-"],
                            ["Rol", UserRoleLabel[user?.role as UserRole]?? "-"],
                            ["Estado", user?.isActive ? "Activo" : "Inactivo"],
                            ["Identificador", user?.identifier ?? "-"],
                        ].map(([label, value]) => (
                            <div key={label} className="flex items-baseline justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                    {label}
                                </span>
                                <span className="text-sm text-foreground">{value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="space-y-4 p-6">
                <UserDocumentsSection
                    user={user}
                    setUser={setUser}
                    IS_MASTER={IS_MASTER}
                    personType={user?.customer?.personType!}
                />
            </Card>

            {showUserModal && (
                <div>
                    <EditUserModal
                        open={showUserModal}
                        onClose={() => setShowUserModal(false)}
                        user={user}
                    />
                </div>
            )}

            {/* Modal create/update customer */}
            {showCustomerModal && (
                <div>
                    <CustomerModal
                        open={showCustomerModal}
                        onClose={() => setShowCustomerModal(false)}
                        user={user}
                        mode={hasCustomer ? "edit" : "create"}
                    />
                </div>
            )}
        </div>
    );
};