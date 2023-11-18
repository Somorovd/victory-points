"use client";

import { columns } from "./game-lobby-columns";
import DataTable from "@/components/ui/data-table";
import { LobbyWithHost } from "@/types";
import { Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal-store";
import { Game } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

const GameLobbyTable = ({ game }: { game: Game }) => {
  const { onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [columnData, setColumnData] = useState<LobbyWithHost[]>([]);

  useEffect(() => {
    (async () => {
      const lobbies = (await axios
        .get(`/api/games/${game.filename}/lobbies`)
        .then((res) => res.data)) as LobbyWithHost[];

      const data: LobbyWithHost[] = lobbies.map((lobby) => ({
        hostName: lobby.host.username,
        hasPassword: !!lobby.password,
        ...lobby,
      }));

      setColumnData(data);
      setIsLoading(false);
    })();
  }, [game]);

  if (isLoading) return <div>Loading...</div>;

  const onClick = (row: Row<LobbyWithHost>) => {
    onOpen("joinLobby", { lobby: row.original });
  };

  return (
    <DataTable
      columns={columns}
      data={columnData}
      onClick={onClick}
    />
  );
};

export default GameLobbyTable;
