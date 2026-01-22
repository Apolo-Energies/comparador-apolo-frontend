
import { useEffect, useRef, useState } from "react";
import { Button } from "../buttons/button";
import { CircleUserIcon, LogOut, Settings, User } from "lucide-react";
import { logout } from "@/actions";
import { Portal } from "./Portal";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.right - 192, // w-48
    });
  };

  const toggleMenu = () => {
    updatePosition();
    setOpen((prev) => !prev);
  };

  // click fuera
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // resize + scroll
  useEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        className="rounded-xl bg-transparent border-border"
        onClick={toggleMenu}
      >
        <CircleUserIcon className="w-4 h-4 text-muted-foreground" />
      </Button>

      {open && (
        <Portal>
          <div
            ref={menuRef}
            style={{ top: position.top, left: position.left }}
            className="fixed z-9999 w-48 rounded-md shadow-lg bg-body border border-border"
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </li>

              <li
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Mi perfil
              </li>

              <form
                action={async () => {
                  setOpen(false);
                  await logout();
                }}
              >
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </form>
            </ul>
          </div>
        </Portal>
      )}
    </>
  );
};
