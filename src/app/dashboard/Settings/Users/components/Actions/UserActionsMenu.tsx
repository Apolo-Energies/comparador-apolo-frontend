import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Settings } from "lucide-react";
import { SelectOptions } from "@/components/Selects/SelectOptions";
import { User } from "../../interfaces/user";
import { ModalRestorePassword } from "../Modals/ModalRestorePassword";

interface Props {
    user: User;
    commissionOptions: any[];
    providersOptions: any[];
    onRoleChange: (userId: string, role: number) => void;
    onStatusChange: (userId: string, active: boolean) => void;
    onCommissionChange: (userId: string, commissionId: string) => void;
    onProviderChange: (userId: string, providerId: number) => void;
}

export const UserActionsMenu = ({
    user,
    commissionOptions,
    providersOptions,
    onRoleChange,
    onStatusChange,
    onCommissionChange,
    onProviderChange,
}: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);

    const [coords, setCoords] = useState<{ top: number; right: number } | null>(
        null
    );

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const openMenu = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();

        setCoords({
            top: rect.bottom + 8,
            right: window.innerWidth - rect.right,
        });

        setMenuOpen(true);
    };

    useEffect(() => {
        if (!menuOpen) return;

        const handler = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    const handleResetPassword = () => {
        setMenuOpen(false);
        setResetOpen(true);
    };

    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
                className="p-2 rounded-md hover:bg-muted text-foreground"
            >
                <Settings size={16} />
            </button>

            {menuOpen &&
                coords &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: "fixed",
                            top: coords.top,
                            right: coords.right,
                        }}
                        className="z-9999 w-96 rounded-lg border border-border bg-card shadow-xl"
                    >
                        {/* Grid 2x2 */}
                        <div className="grid grid-cols-2 gap-3 p-3">
                            {/* Rol */}
                            <div>
                                <span className="block text-xs text-muted-foreground mb-1">
                                    Rol
                                </span>
                                <SelectOptions
                                    value={user.role.toString()}
                                    options={[
                                        { id: "1", name: "Master" },
                                        { id: "2", name: "Colaborador" },
                                    ]}
                                    onChange={(val) =>
                                        onRoleChange(user.id as string, Number(val))
                                    }
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <span className="block text-xs text-muted-foreground mb-1">
                                    Estado
                                </span>
                                <SelectOptions
                                    value={String(user.isActive)}
                                    options={[
                                        { id: "true", name: "Activo" },
                                        { id: "false", name: "Inactivo" },
                                    ]}
                                    onChange={(val) =>
                                        onStatusChange(user.id as string, val === "true")
                                    }
                                />
                            </div>

                            {/* Comisión */}
                            <div>
                                <span className="block text-xs text-muted-foreground mb-1">
                                    Comisión
                                </span>
                                <SelectOptions
                                    value={user.commissions?.[0]?.commissionType?.id ?? ""}
                                    options={commissionOptions.map((c) => ({
                                        id: c.id,
                                        name: c.name,
                                    }))}
                                    onChange={(val) =>
                                        onCommissionChange(user.id as string, val)
                                    }
                                />
                            </div>

                            {/* Proveedor */}
                            <div>
                                <span className="block text-xs text-muted-foreground mb-1">
                                    Proveedor
                                </span>
                                <SelectOptions
                                    value={user.providerId ?? ""}
                                    options={providersOptions.map((p) => ({
                                        id: p.id,
                                        name: p.name,
                                    }))}
                                    onChange={(val) =>
                                        onProviderChange(user.id as string, Number(val))
                                    }
                                />
                            </div>
                        </div>

                        {/* Acción final */}
                        <div className="border-t border-border">
                            <button
                                className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted"
                                onClick={handleResetPassword}
                            >
                                Restablecer contraseña
                            </button>
                        </div>
                    </div>,
                    document.body
                )}

            <ModalRestorePassword
                open={resetOpen}
                user={user}
                onClose={() => setResetOpen(false)}
            />
        </>
    );
};
