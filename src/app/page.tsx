"use client";
import { run } from "node:test";
import { useState, useEffect } from "react";

const numRows = 80; // Nombre de lignes
const numCols = 80; // Nombre de colonnes

// Fonctions utilitaires
const createGrid = () =>
	Array.from({ length: numRows }, () => Array(numCols).fill(0)); // Grille vide
const cloneGrid = (grid: number[][]) => grid.map((row) => [...row]); // Cloner une grille

const neighbors = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
];

export default function GameOfLife() {
	const [grid, setGrid] = useState<number[][]>(createGrid());
	const [running, setRunning] = useState(false);

	// Gestion des générations
	const runSimulation = () => {
		setGrid((prevGrid) => {
			const newGrid = cloneGrid(prevGrid);
			for (let i = 0; i < numRows; i++) {
				for (let j = 0; j < numCols; j++) {
					let liveNeighbors = 0;
					neighbors.forEach(([x, y]) => {
						const ni = i + x;
						const nj = j + y;
						if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
							liveNeighbors += prevGrid[ni][nj];
						}
					});
					// Appliquer les règles
					if (
						prevGrid[i][j] === 1 &&
						(liveNeighbors < 2 || liveNeighbors > 3)
					) {
						newGrid[i][j] = 0; // Meurt
					} else if (prevGrid[i][j] === 0 && liveNeighbors === 3) {
						newGrid[i][j] = 1; // Naît
					}
				}
			}
			return newGrid;
		});
	};

	// Simulation automatique
	const [speed, setSpeed] = useState(100);
	useEffect(() => {
		if (!running) return;
		const interval = setInterval(runSimulation, speed); // Ajuster la vitesse ici
		return () => clearInterval(interval);
	}, [running, speed]);

	return (
		<div className="flex flex-col items-center mt-10">
			<div className="fixed top-4 flex items-center gap-3 z-10 bg-black text-white p-4 shadow-lg rounded-full">
				<h1 className="text-xl font-bold">JeuDeLaVie</h1>
				<div className="flex items-center">
					<label htmlFor="speed">Vitesse</label>
					<input
						type="range"
						min="100"
						max="1000"
						onChange={(e) => setSpeed(parseInt(e.target.value))}
						id="speed"
						value={speed}
						className="ml-4 text-black rounded-xl pl-2"
					/>
				</div>
				<div className="">
					<label htmlFor="numRows">Nombre de lignes</label>
					<input
						type="number"
						min="1"
						max="1"
						id="numRows"
						value={numRows}
						className="ml-4 text-black rounded-xl pl-2"
					/>
				</div>
				<div>
					<label htmlFor="numCols">Nombre de colonnes</label>
					<input
						type="number"
						min="1"
						max="1"
						id="numCols"
						value={numCols}
						className="ml-4 text-black rounded-xl pl-2"
					/>
				</div>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${numCols}, 20px)`,
				}}
			>
				{grid.map((rows, i) =>
					rows.map((col, j) => (
						<div
							key={`${i}-${j}`}
							onClick={() => {
								const newGrid = cloneGrid(grid);
								newGrid[i][j] = grid[i][j] ? 0 : 1; // Inverser l'état
								setGrid(newGrid);
							}}
							style={{
								width: 20,
								height: 20,
								backgroundColor: grid[i][j] ? "black" : "white",
								border: "solid 1px #bdbdbd",
							}}
						/>
					))
				)}
			</div>
			<div className="fixed bottom-5 p-3 shadow-lg bg-gray-100 rounded-full space-x-4">
				<button
					className={`${
						running
							? "bg-red-500 hover:bg-red-700"
							: "bg-green-500 hover:bg-green-700"
					} text-white px-4 py-2 rounded-full`}
					onClick={() => setRunning(!running)}
				>
					{running ? "Arreter" : "Demarrer"}
				</button>
				<button
					className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-full"
					onClick={() => setGrid(createGrid())}
				>
					Réinitialiser
				</button>
			</div>
		</div>
	);
}
