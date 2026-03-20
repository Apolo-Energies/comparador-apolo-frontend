"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Dialog = ({
  open,
  onClose,
  children,
  className,
}: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div
        className={`relative w-full rounded-xl bg-card p-6 text-card-foreground shadow-xl ${className ?? "max-w-xl"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar</span>
        </button>

        {children}
      </div>
    </div>
  );
};