"use client";

import React, { useState, useEffect } from "react";
import SocketIndicator from "../socket-indicator";
import LobbyUsersBar from "./lobby-users-bar";
import { LobbyWithAllUsers } from "@/types";
import { Game, Lobby } from "@prisma/client";
import { useLobbySocket } from "@/hooks/use-lobby-socket";

interface GameContainerProps {
  lobby: LobbyWithAllUsers;
  game: Game;
  socketUrl: string | undefined;
}

const GameContainer = ({ lobby, game, socketUrl }: GameContainerProps) => {
  useLobbySocket({ lobby });

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

  return (
    <div className="flex flex-col">
      <div>
        <SocketIndicator />
        <LobbyUsersBar
          users={lobby.users}
          host={lobby.host}
        />
      </div>
      {sessionStorage.getItem("socketUrl") !== "undefined" && (
        <>
          <div id="game-container"></div>
        </>
      )}
    </div>
  );
};

export default GameContainer;
