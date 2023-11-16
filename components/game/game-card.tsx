import Link from "next/link";
import React from "react";
import Image from "next/image";

interface GameCardProps {
  author: string;
  filename: string;
  img: string;
  name: string;
}

const GameCard = ({ author, filename, img, name }: GameCardProps) => {
  return (
    <Link href={`/games/${filename}`}>
      <div className="bg-zinc-900 hover:bg-zinc-700 rounded-md h-[250px] text-zinc-100 overflow-hidden p-2">
        <div className="bg-blue-400 h-[75%] rounded-md overflow-hidden">
          <Image
            alt="game thumbnail"
            src={img}
            width="100"
            height="100"
          />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{name}</p>
          <p>by {author}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
