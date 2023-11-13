import { Game } from "@prisma/client";
import GameCard from "./game-card";

interface GameBrowserProps {
  games: Record<string, Game>;
}

const GameBrowser = ({ games }: GameBrowserProps) => {
  return (
    <div className="w-full">
      <h2 className="text-zinc-100 text-2xl font-bold p-4 bg-zinc-800">
        Featured Games
      </h2>
      <div id="games-filters"></div>
      <div
        id="games-grid"
        className="grid grid-cols-3 gap-2 p-4 border-2 border-zinc-700"
      >
        {Object.values(games).map((game) => (
          <GameCard
            key={game.id}
            author="dsomorov"
            filename={game.filename}
            name={game.name}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBrowser;
