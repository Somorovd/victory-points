"use client";

import { Button } from "@/components/ui/button";

import GameLobbyTable from "./game-lobby-table";

import { useModal } from "@/hooks/use-modal-store";

import { Game } from "@prisma/client";
import { LobbyWithHost } from "@/types";

interface GameLobbySelectorProps {
  game: Game;
  lobbies: LobbyWithHost[];
}

const GameLobbySelector = ({ game, lobbies }: GameLobbySelectorProps) => {
  const { onOpen } = useModal();

  return (
    <div className="w-full">
      <div className="bg-zinc-800 px-6 py-2 font-bold rounded-t-lg uppercase">
        <h2>{game.name}</h2>
      </div>
      <div className="h-[600px] border-zinc-800 border-2 rounded-b-lg overflow-hidden">
        <div className="p-4 border-b-2 border-zinc-800 flex flex-row items-center justify-between">
          <Button onClick={() => onOpen("createLobby", { game })}>
            Create Lobby
          </Button>
          <div className="flex flex-row gap-4">
            <p>filters</p>
            <p>filters</p>
            <p>filters</p>
          </div>
        </div>
        <GameLobbyTable lobbies={lobbies} />
      </div>
    </div>
  );
};

export default GameLobbySelector;
