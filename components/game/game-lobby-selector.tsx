"use client";

import { Button } from "@/components/ui/button";
import GameLobbyTable from "./game-lobby-table";
import { useModal } from "@/hooks/use-modal-store";
import { Game } from "@prisma/client";
import { RefreshCcw } from "lucide-react";

interface GameLobbySelectorProps {
  game: Game;
}

const GameLobbySelector = ({ game }: GameLobbySelectorProps) => {
  const { onOpen } = useModal();

  return (
    <div className="w-full h-[600px]">
      <div className="p-4 border-b-2 border-zinc-800 flex flex-row items-center justify-between">
        <Button onClick={() => onOpen("createLobby", { game })}>
          Create Lobby
        </Button>
        <Button
          onClick={() => {
            console.log("refreshing... (not really, not yet)");
          }}
        >
          <RefreshCcw />
        </Button>
      </div>
      <GameLobbyTable game={game} />
    </div>
  );
};

export default GameLobbySelector;
