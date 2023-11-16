import { User } from "@prisma/client";
import LobbyUserIcon from "./lobby-user-icon";
import { useLobbySocket } from "@/hooks/use-lobby-socket";

interface LobbyUsersBarProps {
  users: User[];
  host: User;
}

const LobbyUsersBar = ({ users, host }: LobbyUsersBarProps) => {
  useLobbySocket({});

  return (
    <div className="flex flex-row gap-2">
      {users.map((user) => (
        <LobbyUserIcon
          key={user.id}
          user={user}
          host={host}
        />
      ))}
    </div>
  );
};

export default LobbyUsersBar;
