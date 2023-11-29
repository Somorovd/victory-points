import { normalizeDatabaseData } from "@/lib/utils";
import { User } from "@prisma/client";
import { create } from "zustand";

type UserWithSocketId = User & { socketId?: string};

interface LobbyStore {
  users: Record<string, UserWithSocketId>;
  host: UserWithSocketId | null;
  setUsers: (users: UserWithSocketId[]) => void;
  setHost: (host: UserWithSocketId) => void;
  addUser: (user: UserWithSocketId) => void;
  removeUser: (user: UserWithSocketId) => void;
}

export const useLobby = create<LobbyStore>((set, get) => ({
  users: {},
  host: null,
  setUsers: (users) => set({ users: normalizeDatabaseData(users, "id") }),
  setHost: (host) => set({ host: host }),
  addUser: (user) => {
    const users = { ...get().users, [user.id]: user };
    set({ users });
  },
  removeUser: (user) => {
    const users = { ...get().users };
    delete users[user.id];
    set({ users });
  },
}));
