"use client";

import { User } from "@prisma/client";
import LobbyUserIcon from "./lobby-user-icon";
import { useLobby } from "@/hooks/use-lobby-store";

interface LobbyUsersBarProps {
  users: User[];
  host: User;
}

const LobbyUsersBar = ({ users, host }: LobbyUsersBarProps) => {
  const { users: lobbyUsers, host: lobbyHost } = useLobby();

  return (
    <div className="flex flex-row gap-2">
      {Object.values(lobbyUsers).map((user) => (
        <LobbyUserIcon
          key={user.id}
          user={user}
          host={lobbyHost!}
        />
      ))}
    </div>
  );
};

export default LobbyUsersBar;
