import { db } from "@/lib/db";
import { Game } from "@prisma/client";
import GameCard from "@/components/game/game-card";

const BrowseGamesPage = async () => {
  const games = (await db.game.findMany()) as Game[];

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-zinc-100 text-2xl font-bold p-4 bg-zinc-800">
        Featured Games
      </h2>
      <div
        id="games-filters"
        className="h-[100px] border-2 border-zinc-800 flex justify-center items-center"
      >
        Filters Coming Soon
      </div>
      <div
        id="games-grid"
        className="grid grid-cols-3 gap-2 p-4 border-2 border-zinc-800"
      >
        {games.map((game) => (
          <GameCard
            key={game.name}
            author="dsomorov"
            filename={game.filename}
            name={game.name}
            img={game.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseGamesPage;
