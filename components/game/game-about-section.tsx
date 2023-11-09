import { Game } from "@prisma/client";

interface GameAboutSectionProps {
  game: Game;
}

const GameAboutSection = ({ game }: GameAboutSectionProps) => {
  return <div>GameAboutSection</div>;
};

export default GameAboutSection;
