import { Building, Calculator, TrendingUp, Zap } from "lucide-react";
import React from "react";

interface Props {
  setSelectedTab: (id: string) => void;
  selectedTab: string;
}

export const NavigatorTop = ({ setSelectedTab, selectedTab }: Props) => {
  const tabs = [
    { id: "proveedor", name: "Proveedor", icon: Building, count: 1 },
    {
      id: "tarifas",
      name: "Tarifas",
      icon: Calculator,
      //   count: filteredTariffs.length,
    },
    {
      id: "reparto",
      name: "Reparto OMIE",
      icon: TrendingUp,
      //   count: filteredReparto.length,
    },
    {
      id: "potencia",
      name: "Potencia BOE",
      icon: Zap,
      //   count: filteredPotencia.length,
    },
  ];

  return (
    <div className="bg-card border-r border-border rounded-lg border shadow-sm p-1">
      <div className="flex space-x-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                selectedTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon 
                size={14}
                className={`w-4 h-4 ${
                  selectedTab
                    ? "text-sidebar-selected-text"
                    : "text-sidebar-text"
                }`}
              />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
