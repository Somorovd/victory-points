import { normalizeDatabaseData } from "@/lib/utils";
import { User } from "@prisma/client";
import { create } from "zustand";

interface LobbyStore {
  users: Record<string, User>;
  host: User | null;
  setUsers: (users: User[]) => void;
  setHost: (host: User) => void;
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
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
