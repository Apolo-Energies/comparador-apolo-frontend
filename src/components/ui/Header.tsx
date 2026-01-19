"use client";
import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import { ModeToggle } from "../buttons/ModeToggle";
import { Button } from "../buttons/button";
import { UserMenu } from "./UserMenu";
import { useSidebarStore } from "@/app/store/ui/sidebar.store";
import { useSession } from "next-auth/react";
import { getCommissionUser } from "@/app/services/UserCommissionService/user-commission.service";
import { useCommissionUserStore } from "@/app/store/commission-user/commission-user.store";
import { InfoIcon } from "@/incons/InfoIcon";
import { StarIcon } from "@/incons/StartIcon";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();
  const { setCommission } = useCommissionUserStore();

  useEffect(() => {
    const fetchCommission = async () => {
      if (!session?.user?.token) return;

      try {
        const res = await getCommissionUser(session.user.token, session.user.id);
        if (res.isSuccess) {
          setCommission(res.result?.commissionType.percentage);
        } else {
          console.error("Error fetching commission:", res.displayMessage);
        }
      } catch (error) {
        console.error("Unexpected error fetching commission:", error);
      }
    };

    fetchCommission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.token]);

  const { toggle } = useSidebarStore();
  return (
    <header className="h-18.5 border-b border-border bg-card backdrop-blur supports-backdrop-filter:bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <Button
          onClick={toggle}
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>
        {/* <div>
          <h1 className="text-xl sm:text-lg md:text-xl font-semibold text-foreground">
            APOLO ENERGIES
          </h1>
          <p className="text-sm sm:text-xs md:text-sm text-muted-foreground">
            Portal de colaboradores {commission}
          </p>
        </div> */}
        <div className="flex gap-3">
          <InfoIcon size={20} className="text-[#12AFF0]" />
          <div>
            <p className="text-sm sm:text-sm md:text-sm font-semibold text-foreground">
              Bienvenido al portal de colaboradores de Apolo Energies.
            </p>
            <p className="text-sm sm:text-xs md:text-sm text-muted-foreground">
              Tu panel de control para gestionar clientes, analizar consumos y acceder a insights clave del mercado energético.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="https://ee.apoloenergies.es/App/">
            <Button>
              <StarIcon /> Alta Rapida
            </Button>
          </Link>
          {/* <ModeToggle /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
