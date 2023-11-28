"use client";

import React, { useEffect } from "react";
import LobbyUsersBar from "./lobby-users-bar";
import { LobbyWithAllUsers } from "@/types";
import { Game } from "@prisma/client";
import { useLobbySocket } from "@/hooks/use-lobby-socket";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface GameContainerProps {
  lobby: LobbyWithAllUsers;
  game: Game;
  socketUrl: string | undefined;
}

const GameContainer = ({ lobby, game, socketUrl }: GameContainerProps) => {
  useLobbySocket({ lobby });
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("roomId", lobby.id);
    sessionStorage.setItem("socketUrl", socketUrl || "undefined");
    loadGame();
  }, [lobby, socketUrl]);

  const loadGame = () => {
    const script = document.createElement("script");
    script.src = `/${game.filename}/main.js`;
    script.async = true;
    document.body.appendChild(script);
  };

  const leaveLobby = async () => {
    try {
      await axios.post(`/api/socket/lobbies/leave`, {
        lobbyId: lobby.id,
      });
      router.push(`/games/${game.filename}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={leaveLobby}
        className="w-fit"
      >
        Leave Lobby
      </Button>

      <LobbyUsersBar
        users={lobby.users}
        host={lobby.host}
      />
      {sessionStorage.getItem("socketUrl") !== "undefined" && (
        <>
          <div id="game-container"></div>
        </>
      )}
    </div>
  );
};

export default GameContainer;
