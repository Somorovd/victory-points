import Link from "next/link";
import React from "react";
import Image from "next/image";

interface GameCardProps {
  author: string;
  id: string;
  img?: string;
  name: string;
}

const GameCard = ({ author, id, img, name }: GameCardProps) => {
  return (
    <Link href={`/games/${id}`}>
      <div className="bg-gray-900 hover:bg-gray-700 rounded-md h-[250px] text-white overflow-hidden p-2">
        <div className="bg-blue-400 h-[75%] rounded-md overflow-hidden">
          <Image className="" alt="game thumbnail" src={img ? img : ""} />
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
