"use client";

import React, { useEffect } from "react";
import SocketIndicator from "../socket-indicator";

interface GameContainerProps {
  lobbyId: string;
  filename: string;
  socketUrl: string | undefined;
}

const GameContainer = ({
  lobbyId,
  filename,
  socketUrl,
}: GameContainerProps) => {
  useEffect(() => {
    sessionStorage.setItem("roomId", lobbyId);
    sessionStorage.setItem("socketUrl", socketUrl || "undefined");
  }, [lobbyId, socketUrl]);

  return (
    <div className="flex flex-col">
      <div>
        <SocketIndicator />
      </div>
      {sessionStorage.getItem("socketUrl") !== "undefined" && (
        <>
          <div id="game-container"></div>
          <script
            src={`/${filename}/main.js`}
            async
          ></script>
        </>
      )}
    </div>
  );
};

export default GameContainer;
