
import { ArrowDownBoxIcon } from "@/incons/ArrowDownBoxIcon";
import { CircleIcon } from "@/incons/CicleIcon";
import { CompassIcon } from "@/incons/CompassIcon";
import { ListIcon } from "@/incons/ListIcon";
import { PieIcon } from "@/incons/PieIcon";
import { SettingsIcon } from "@/incons/SettingsIcon";
import { SupportIcon } from "@/incons/SupportIcon";

interface SidebarChild {
  title: string;
  url: string;
  icon?: React.ComponentType<SVGSVGElement>;
  roles: string[];
}

interface SidebarItem {
  section?: string;
  title: string;
  icon?: React.ComponentType<SVGSVGElement>;
  url?: string;
  roles: string[];
  children?: SidebarChild[];
}

interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

export const sidebarItems: SidebarSection[] = [
  {
    section: "General",
    items: [
      {
        title: "Contratos",
        icon: ListIcon,
        roles: ["Master", "Colaborador"],
        url: "https://ee.apoloenergies.es/App/ContratosServicios/Wizard?q=68fHKAqZKDEuSApYdhV5pw%3D%3D",
      },
      {
        title: "Analítica",
        icon: PieIcon,
        roles: ["Master"],
        children: [
          {
            title: "Historial",
            url: "/dashboard/Analytics/HistorialComparador",
            icon: CircleIcon,
            roles: ["Master"],
          },
          {
            title: "Estadísticas",
            url: "/dashboard/Analytics/Statistics",
            icon: CircleIcon,
            roles: ["Master"],
          },
        ],
      },
      {
        title: "Comparador",
        url: "/dashboard/Comparator",
        icon: ArrowDownBoxIcon,
        roles: ["Master", "Colaborador"],
      },
      {
        title: "Consulta SIPS",
        url: "/dashboard/Sips",
        icon: CompassIcon,
        roles: ["Master", "Colaborador"],
      },

    ],
  },
  {
    section: "Soporte",
    items: [
      {
        title: "Ajustes",
        icon: SettingsIcon,
        roles: ["Master"],
        children: [
          {
            title: "Usuarios",
            url: "/dashboard/Settings/Users",
            icon: CircleIcon,
            roles: ["Master"],
          },
          // {
          //   title: "Contratos Colab",
          //   url: "/dashboard/Settings/ContractCollaborators",
          //   icon: CircleIcon,
          //   roles: ["Master"],
          // },
          {
            title: "Comisión",
            url: "/dashboard/Settings/Comision",
            icon: CircleIcon,
            roles: ["Master"],
          },
          {
            title: "Tarifas",
            icon: CircleIcon,
            roles: ["Master"],
            url: "/dashboard/Settings/Rates",
          },
        ],
      },
      {
        title: "Soporte Comercial",
        icon: SupportIcon,
        roles: ["Master", "Colaborador"],
        url: "https://wa.me/623136797",
      },
    ],
  },
];
