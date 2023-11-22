import { User } from "@prisma/client";
import LobbyUserIcon from "./lobby-user-icon";
import { useLobby } from "@/hooks/use-lobby-store";
import { useEffect } from "react";

interface LobbyUsersBarProps {
  users: User[];
  host: User;
}

const LobbyUsersBar = ({ users, host }: LobbyUsersBarProps) => {
  const { users: lobbyUsers, host: lobbyHost, setUsers, setHost } = useLobby();

  useEffect(() => {
    setUsers(users);
    setHost(host);
  }, []);

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
