import { db } from "@/lib/db";

const GamePageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameName: string };
}) => {
  const game = await db.game.findUnique({
    where: { filename: params.gameName },
  });

  return <div className="h-full w-[1200px] m-auto">{children}</div>;
};

export default GamePageLayout;
