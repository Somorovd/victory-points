import { columns } from "./game-lobby-columns";
import DataTable from "@/components/ui/data-table";
import { LobbyWithHost } from "@/types";
import { Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal-store";

const GameLobbyTable = ({ lobbies }: { lobbies: LobbyWithHost[] }) => {
  const { onOpen } = useModal();

  const data: LobbyWithHost[] = lobbies.map((lobby) => ({
    hostName: lobby.host.username,
    hasPassword: !!lobby.password,
    ...lobby,
  }));

  const onClick = (row: Row<LobbyWithHost>) => {
    onOpen("joinLobby", { lobby: row.original });
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      onClick={onClick}
    />
  );
};

export default GameLobbyTable;
