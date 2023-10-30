import React from "react";
import NoSSRWrapper from "./NoSSRWrapper";

const GameContainer = ({ game }: { game: string }) => {
  return (
    <NoSSRWrapper>
      <div id="game-container"></div>
      <script src={`/${game}/main.js`} async></script>
    </NoSSRWrapper>
  );
};

export default GameContainer;
