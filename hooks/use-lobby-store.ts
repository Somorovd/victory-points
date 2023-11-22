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

export const useLobby = create<LobbyStore>((set) => ({
  users: {},
  host: null,
  setUsers: (users) => set({ users: normalizeDatabaseData(users, "id") }),
  setHost: (host) => set({ host: host }),
  addUser: (user) =>
    set((state) => ({ users: { ...state.users, [user.id]: user } })),
  removeUser: (user) =>
    set((state) => {
      const users = { ...state.users };
      delete users[user.id];
      return { users: users };
    }),
}));
