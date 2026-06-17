"use client";

import { useState, useEffect } from "react";

type Cell = {
  hasShip: boolean;
  guessed: boolean;
  hit: boolean;
};

type Board = Cell[];

function createEmptyBoard(): Board {
  return Array.from({ length: 16 }, () => ({
    hasShip: false,
    guessed: false,
    hit: false,
  }));
}

function placeShip(board: Board): Board {
  const newBoard = board.map(c => ({ ...c }));

  const isHorizontal = Math.random() < 0.5;

  const row = Math.floor(Math.random() * 4);
  const col = Math.floor(Math.random() * 4);

  if (isHorizontal) {
    const safeCol = Math.min(col, 1);

    const startIndex = row * 4 + safeCol;

    for (let i = 0; i < 3; i++) {
      newBoard[startIndex + i].hasShip = true;
    }
  } else {
    const safeRow = Math.min(row, 1);

    const startIndex = safeRow * 4 + col;

    for (let i = 0; i < 3; i++) {
      newBoard[startIndex + i * 4].hasShip = true;
    }
  }

  return newBoard;
}

function createBoardWithShip(): Board {
  return placeShip(createEmptyBoard());
}

function getRandomUnguessedIndex(board: Board) {
  const options = board
    .map((c, i) => (!c.guessed ? i : null))
    .filter((i): i is number => i !== null);

  return options[Math.floor(Math.random() * options.length)];
}

function checkWin(board: Board) {
  return board.every(c => !c.hasShip || c.hit);
}

function getNeighbors(index: number) {
  const row = Math.floor(index / 4);
  const col = index % 4;

  const n: number[] = [];

  if (row > 0) n.push(index - 4);
  if (row < 3) n.push(index + 4);
  if (col > 0) n.push(index - 1);
  if (col < 3) n.push(index + 1);

  return n;
}

function renderBoard(board: Board, showShips: boolean) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 50px)",
        gap: "4px",
        marginBottom: "20px",
      }}
    >
      {board.map((cell, i) => (
        <div
          key={i}
          style={{
            width: 50,
            height: 50,
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: cell.guessed
              ? cell.hit
                ? "red"
                : "lightgray"
              : "white",
          }}
        >
          {cell.guessed
            ? cell.hit
              ? "X"
              : "O"
            : showShips && cell.hasShip
              ? "B"
              : ""}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const [playerBoard, setPlayerBoard] = useState<Board>(createEmptyBoard());
  const [aiBoard, setAiBoard] = useState<Board>(createEmptyBoard());

  const [gameOver, setGameOver] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiTargets, setAiTargets] = useState<number[]>([]);

  useEffect(() => {
    setPlayerBoard(createBoardWithShip());
    setAiBoard(createBoardWithShip());
  }, []);

  function handleAIClick(index: number) {
    if (gameOver || aiThinking) return;

    let playerWon = false;

    setAiBoard(prev => {
      const board = prev.map(c => ({ ...c }));
      const cell = board[index];

      if (!cell.guessed) {
        cell.guessed = true;
        if (cell.hasShip) cell.hit = true;
      }

      playerWon = checkWin(board);

      return board;
    });

    setTimeout(() => {
      if (playerWon) {
        setGameOver(true);
        alert("You win!");
        return;
      }

      handleAITurn();
    }, 0);
  }

  function handleAITurn() {
    if (gameOver || aiThinking) return;

    setAiThinking(true);

    setTimeout(() => {
        let aiWon = false;

        const newBoard = playerBoard.map(c => ({ ...c }));

        let index: number;

        const validTargets = aiTargets.filter(i => !newBoard[i]?.guessed);

        if (validTargets.length > 0) {
        index = validTargets[0];
        setAiTargets(validTargets.slice(1));
        } else {
        index = getRandomUnguessedIndex(newBoard);
        }

        const cell = newBoard[index];

        if (!cell.guessed) {
            cell.guessed = true;

            if (cell.hasShip) {
                if (cell.hasShip) {
                    cell.hit = true;

                    const neighbors = getNeighbors(index);

                    for (let i = neighbors.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
                    }

                    setAiTargets(prev => [
                        ...prev,
                        ...neighbors.filter(i => !newBoard[i].guessed)
                    ]);
                }
            }
        }

        aiWon = checkWin(newBoard);

        setPlayerBoard(newBoard);

        if (aiWon) {
        setGameOver(true);
        alert("AI wins!");
        }

        setAiThinking(false);
    }, 400);
    }

  return (
    <div>
      <h2>Player Board</h2>
      {renderBoard(playerBoard, true)}

      <h2>AI Board</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 50px)",
          gap: "4px",
        }}
      >
        {aiBoard.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleAIClick(i)}
            style={{
              width: 50,
              height: 50,
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: cell.guessed
                ? cell.hit
                  ? "red"
                  : "lightgray"
                : "white",
            }}
          >
            {cell.guessed ? (cell.hit ? "X" : "O") : ""}
          </div>
        ))}
      </div>
    </div>
  );
}