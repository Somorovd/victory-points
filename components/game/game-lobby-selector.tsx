"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { LobbyWithHost } from "@/types";
import { Game } from "@prisma/client";

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
      <div className="h-[600px] border-zinc-800 border-2 rounded-b-lg">
        <Button onClick={() => onOpen("createLobby", { game })}>
          Create Lobby
        </Button>
        <div></div>
        {lobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="flex flex-row gap-2"
          >
            <span>{lobby.name}</span>
            <span>{lobby.host.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLobbySelector;
