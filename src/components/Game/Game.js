import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessHistory from "../GuessHistory";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GameOverBanner from "../GameOverBanner";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const computedGuesses = guesses.map((guess) => checkGuess(guess, answer));
  const hasWon = computedGuesses.find((computedGuess) =>
    computedGuess.every((char) => char.status === "correct")
  );
  const isGameOver = guesses.length >= NUM_OF_GUESSES_ALLOWED || hasWon;
  const [gameState, setGameState] = React.useState("running");

  function handleGameState(guesses) {
    const currentGuess = guesses[guesses.length - 1];

    if (currentGuess.toUpperCase() === answer) {
      setGameState("won");
    } else if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameState("lost");
    }
  }

  function handleGuess(guess) {
    const newGuesses = [...guesses, guess];

    setGuesses(newGuesses);
    handleGameState(newGuesses);
  }

  return (
    <>
      <GuessHistory guesses={guesses} answer={answer} />
      <GuessInput onGuess={handleGuess} isGameOver={isGameOver} />
      {gameState === "won" && (
        <GameOverBanner
          hasWon={hasWon}
          answser={answer}
          numOfGuesses={guesses.length}
        />
      )}
      {gameState === "lost" && (
        <GameOverBanner
          hasWon={hasWon}
          answser={answer}
          numOfGuesses={guesses.length}
        />
      )}
    </>
  );
}

export default Game;
