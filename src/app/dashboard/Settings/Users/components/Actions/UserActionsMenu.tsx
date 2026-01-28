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
    onEnergyExpertChange: (userId: string, isEnergyExpert: boolean) => void;
}

export const UserActionsMenu = ({
    user,
    commissionOptions,
    providersOptions,
    onRoleChange,
    onStatusChange,
    onCommissionChange,
    onProviderChange,
    onEnergyExpertChange
}: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const openMenu = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();

        const MENU_WIDTH = 384;
        const MENU_HEIGHT = 260;
        const GAP = 8;

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceRight = window.innerWidth - rect.left;

        const top = spaceBelow < MENU_HEIGHT
            ? Math.max(
                rect.top - MENU_HEIGHT - GAP,
                rect.top - MENU_HEIGHT / 1.8
            )
            : rect.bottom + GAP;


        const left =
            spaceRight < MENU_WIDTH
                ? rect.right - MENU_WIDTH
                : rect.left;

        setCoords({
            top: Math.max(GAP, top),
            left: Math.max(GAP, Math.min(left, window.innerWidth - MENU_WIDTH - GAP)),
        });

        setMenuOpen(true);
    };

    useEffect(() => {
        if (!menuOpen) return;

        const handleResize = () => {
            openMenu();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [menuOpen]);


    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => {
                    if (menuOpen) {
                        setMenuOpen(false);
                    } else {
                        openMenu();
                    }
                }}
                className="p-2 rounded-md hover:bg-muted"
            >

                <Settings size={16} />
            </button>

            {menuOpen &&
                coords &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{ top: coords.top, left: coords.left }}
                        className="fixed z-9999 w-96 rounded-lg border border-border bg-card shadow-xl"
                    >
                        <div className="grid grid-cols-2 gap-3 p-3">
                            <SelectOptions
                                value={user.role.toString()}
                                options={[
                                    { id: "1", name: "Master" },
                                    { id: "2", name: "Colaborador" },
                                ]}
                                onChange={(v) => onRoleChange(user.id, Number(v))}
                            />

                            <SelectOptions
                                value={String(user.isActive)}
                                options={[
                                    { id: "true", name: "Activo" },
                                    { id: "false", name: "Inactivo" },
                                ]}
                                onChange={(v) => onStatusChange(user.id, v === "true")}
                            />

                            {/* 👇 NUEVO: Energy Expert */}
                            <SelectOptions
                                value={String(user.isEnergyExpert)}
                                options={[
                                    { id: "true", name: "Energy Expert" },
                                    { id: "false", name: "No Energy Expert" },
                                ]}
                                onChange={(v) => onEnergyExpertChange(user.id, v === "true")}
                            />

                            <SelectOptions
                                value={user.commissions?.[0]?.commissionType?.id ?? ""}
                                options={commissionOptions.map((c: any) => ({
                                    id: c.id,
                                    name: c.name,
                                }))}
                                onChange={(v) => onCommissionChange(user.id, v)}
                            />

                            <SelectOptions
                                value={user.providerId ?? ""}
                                options={providersOptions.map((p: any) => ({
                                    id: p.id,
                                    name: p.name,
                                }))}
                                onChange={(v) => onProviderChange(user.id, Number(v))}
                            />
                        </div>


                        <div className="border-t border-border">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setResetOpen(true);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted"
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