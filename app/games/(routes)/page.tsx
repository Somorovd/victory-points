import React from "react";
import GameCard from "@/components/game/game-card";
import { db } from "@/lib/db";

const Browse = async () => {
  const games = await db.game.findMany();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <h2 className="text-zinc-100 text-2xl font-bold p-4 bg-zinc-800">
          Featured Games
        </h2>
        <div id="games-filters"></div>
        <div
          id="games-grid"
          className="grid grid-cols-3 gap-2 p-4 border-2 border-zinc-700"
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              author="dsomorov"
              filename={game.filename}
              name={game.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
