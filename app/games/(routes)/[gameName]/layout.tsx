import GameAboutSection from "@/components/game/game-about-section";
import { db } from "@/lib/db";
import { Game } from "@prisma/client";
import { redirect } from "next/navigation";

const GamePageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameName: string };
}) => {
  const game = await db.game.findFirst({
    where: { name: params.gameName },
  });

  if (!game) return redirect("/games");

  return (
    <div className="h-full w-full m-auto">
      <div>{children}</div>
      <div>
        <GameAboutSection game={game} />
      </div>
    </div>
  );
};

export default GamePageLayout;
