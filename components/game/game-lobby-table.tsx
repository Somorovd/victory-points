"use client";

import { columns } from "./game-lobby-columns";
import DataTable from "@/components/ui/data-table";
import { LobbyWithHost } from "@/types";
import { Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal-store";
import useStore from "@/hooks/use-store";
import { useGames } from "@/hooks/use-games-store";
import { Game } from "@prisma/client";
import { useState, useEffect } from "react";

const GameLobbyTable = ({ game }: { game: Game }) => {
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const gameStore = useStore(useGames, (state) => state);

  useEffect(() => {
    if (!gameStore || isMounted) return;
    gameStore.fetchLobbies(game.filename);
    setIsMounted(true);
  }, [gameStore]);

  if (!gameStore || !isMounted || gameStore.fetchStatus === "PENDING")
    return <div>Loading...</div>;

  const data: LobbyWithHost[] = Object.values(gameStore.currentLobbies).map(
    (lobby) => ({
      hostName: lobby.host.username,
      hasPassword: !!lobby.password,
      ...lobby,
    })
  );

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
