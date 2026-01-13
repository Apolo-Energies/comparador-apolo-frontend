import { Provider, Tariff } from "@/app/dashboard/Settings/Rates/interfaces/proveedor";
import { create } from "zustand";

interface TariffStore {
  currentProvider: Provider | null;
  setCurrentProvider: (provider: Provider | null) => void;

  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff | null) => void;

  selectedMode: string;
  setSelectedMode: (mode: string) => void;

  tariffs: Tariff[];
  setTariffs: (tariffs: Tariff[]) => void;
}

export const useTariffStore = create<TariffStore>((set) => ({
  currentProvider: null,
  setCurrentProvider: (provider) =>
    set({ currentProvider: provider }),

  selectedTariff: null,
  setSelectedTariff: (tariff) =>
    set({ selectedTariff: tariff, selectedMode: "" }),

  selectedMode: "",
  setSelectedMode: (mode) =>
    set({ selectedMode: mode }),

  tariffs: [],
  setTariffs: (tariffs) =>
    set({ tariffs }),
}));
