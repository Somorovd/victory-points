import React from "react";
import Link from "next/link";

const Browse = () => {
  return (
    <div className="h-full w-full flex justify-center">
      <ul className="flex flex-col items-center">
        <Link href="/games/tictactoe" className="hover:underline">
          TicTacToe
        </Link>
        <Link href="/games/hearts" className="hover:underline">
          Hearts
        </Link>
        <Link href="/games/abc" className="hover:underline">
          ABC_Test_Game
        </Link>
      </ul>
    </div>
  );
};

export default Browse;
