import { columns, LobbyRow } from "./game-lobby-columns";
import DataTable from "@/components/ui/data-table";
import { LobbyWithHost } from "@/types";
import { Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal-store";

const GameLobbyTable = ({ lobbies }: { lobbies: LobbyWithHost[] }) => {
  const { onOpen } = useModal();

  const data: LobbyRow[] = lobbies.map((lobby) => ({
    hostName: lobby.host.username,
    name: lobby.name,
    hasPassword: !!lobby.password,
    capacity: lobby.capacity,
  }));

  const onClick = (row: Row<LobbyRow>) => {
    onOpen("joinLobby");
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
