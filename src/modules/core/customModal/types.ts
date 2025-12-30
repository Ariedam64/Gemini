import type {
  QuinoaModal,
  InventoryItem,
  Journal,
  PlayerStats,
  ShopInventoryItem,
  PetInventoryItem,
} from "../../../atoms/types";

export type CustomizableModal = Exclude<QuinoaModal, null>;

export type ModalDataMap = {
  inventory: {
    items: InventoryItem[];
    storages?: unknown[];
    favoritedItemIds?: string[];
  };
  journal: Journal;
  stats: PlayerStats;
  activityLog: {
    logs: unknown[];
  };
  seedShop: {
    inventory: ShopInventoryItem[];
    secondsUntilRestock?: number;
  };
  eggShop: {
    inventory: ShopInventoryItem[];
    secondsUntilRestock?: number;
  };
  toolShop: {
    inventory: ShopInventoryItem[];
    secondsUntilRestock?: number;
  };
  decorShop: {
    inventory: ShopInventoryItem[];
    secondsUntilRestock?: number;
  };
  leaderboard: {
    entries: unknown[];
  };
  petHutch: {
    items: unknown[];
    petItems: PetInventoryItem[];
  };
};

export type ShadowEntry<M extends CustomizableModal = CustomizableModal> = {
  modal: M;
  data: ModalDataMap[M];
  timestamp: number;
};

export type AtomProxyConfig = {
  atomLabel: string;
  dataKey: string;
  transform?: (shadowData: unknown) => unknown;
};

export type DerivedAtomConfig = {
  atomLabel: string;
  sourceKey: string;
  deriveFn: (data: unknown) => unknown;
};

export type ModalRegistryEntry = {
  atoms: AtomProxyConfig[];
  derivedAtoms?: DerivedAtomConfig[];
};

export type ModalOpenEvent = {
  modal: CustomizableModal;
  isCustom: boolean;
};

export type ModalCloseEvent = {
  modal: CustomizableModal;
  wasCustom: boolean;
  closedBy: "user" | "api" | "native";
};

export type Unsubscribe = () => void;
