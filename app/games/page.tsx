import React from "react";
import GameCard from "@/components/GameCard";

const Browse = () => {
	return (
		<div className="h-full w-full flex justify-center bg-gray-700">
			<div id="games-container" className="mx-auto w-[1200px] bg-black">
				<h2 className="text-white text-2xl font-bold p-4 bg-gray-800">
					Featured Games
				</h2>
				<div id="games-filters"></div>
				<div id="games-grid" className="grid grid-cols-3 gap-2 p-4">
					<GameCard author="dsomorov" id="tictactoe" name="TicTacToe" />
					<GameCard author="dsomorov" id="hearts" name="Hearts" />
					<GameCard author="dsomorov" id="abc" name="TEST GAME" />
					<GameCard author="dsomorov" id="tictactoe" name="TicTacToe" />
					<GameCard author="dsomorov" id="tictactoe" name="TicTacToe" />
				</div>
			</div>
		</div>
	);
};

export default Browse;
