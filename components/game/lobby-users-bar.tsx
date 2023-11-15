import { User } from "@prisma/client";
import LobbyUserIcon from "./lobby-user-icon";

interface LobbyUsersBarProps {
  users: User[];
  host: User;
}

const LobbyUsersBar = ({ users, host }: LobbyUsersBarProps) => {
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
