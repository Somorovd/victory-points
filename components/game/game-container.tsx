"use client";

import React, { useEffect } from "react";

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
    <>
      {sessionStorage.getItem("socketUrl") !== "undefined" && (
        <>
          <div id="game-container"></div>
          <script
            src={`/${filename}/main.js`}
            async
          ></script>
        </>
      )}
    </>
  );
};

export default GameContainer;
