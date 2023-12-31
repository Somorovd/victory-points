import { LobbyWithHost } from "@/types";
import { Game } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createLobby" | "joinLobby";

interface ModalData {
  game?: Game;
  lobby?: LobbyWithHost;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
