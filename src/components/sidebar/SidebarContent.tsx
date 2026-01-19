"use client";

import React, { useEffect, useState, useMemo, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { sidebarItems } from "@/constants/SidebarItems";
import { SidebarItem } from "./SidebarItem";
import { LogoutIcon } from "@/incons/LogoutIcon";

export const SidebarContent = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { data: session, update } = useSession();
  const [sessionUpdated, setSessionUpdated] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const userRole = session?.user.role || "";

  useEffect(() => {
    if (session && !sessionUpdated) {
      update();
      setSessionUpdated(true);
    }
  }, [session, sessionUpdated, update]);

  const logoSrc = useMemo(
    () => (theme === "dark" ? "/logos/apolologo2.webp" : "/logos/apolologo.webp"),
    [theme]
  );

  const handleToggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col">
      <Link href="/dashboard" className="flex justify-center items-center w-full h-18.5 border-b border-border px-2">
        <div className="relative w-full h-[64%] max-w-xs">
          <Image src={logoSrc} alt="Apolo Energies" fill style={{ objectFit: "contain" }} priority />
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {sidebarItems.map((section, sIndex) => (
          <Fragment key={sIndex}>
            <div className="-mx-3 pb-4 border-b border-border">
              <p className="text-xs font-semibold text-[#99B2C6] tracking-wide mb-2 px-3">
                {section.section}
              </p>

              {section.items
                .filter((item) => item.roles.includes(userRole))
                .map((item, index) => {
                  const hasChildren = !!item.children?.length;
                  const isChildActive = item.children?.some((child) => pathname.startsWith(child.url));

                  const isOpen = openMenu === item.title
                  const isSelected = item.url
                    ? pathname.startsWith(item.url)
                    : isChildActive;

                  return (
                    <div className="px-2" key={index}>
                      {item.url && !hasChildren ? (
                        <Link href={item.url}>
                          <SidebarItem title={item.title} icon={item.icon} isSelected={isSelected} />
                        </Link>
                      ) : (
                        <SidebarItem
                          title={item.title}
                          icon={item.icon}
                          isSelected={isSelected}
                          onClick={() => handleToggleMenu(item.title)}
                          rightIcon={
                            hasChildren ? (
                              isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                            ) : null
                          }
                        />
                      )}

                      {hasChildren && isOpen && (
                        <div className="ml-4 mt-1 flex flex-col gap-1 transition-all duration-300 ease-in-out">
                          {item.children
                            ?.filter((child) => child.roles.includes(userRole))
                            .map((child, i) => (
                              <Link key={i} href={child.url}>
                                <SidebarItem
                                  title={child.title}
                                  icon={child.icon}
                                  isSelected={pathname === child.url}
                                  className="cursor-pointer py-1.5 pl-2 bg-transparent hover:text-foreground hover:bg-transparent"
                                />
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </Fragment>
        ))}
      </nav>
      <div
        onClick={() => { /* lógica de logout */ }}
        className="mt-auto px-4 py-4 border-t border-border cursor-pointer flex items-center transition-colors duration-150 hover:bg-accent group"
      >
        <div className="flex items-center gap-2 ml-6">
          <LogoutIcon className="w-6 h-6 text-red-500 group-hover:text-foreground" />
          <span className="text-sm font-medium text-red-500 group-hover:text-foreground">
            Logout
          </span>
        </div>
      </div>

    </aside>
  );
};
