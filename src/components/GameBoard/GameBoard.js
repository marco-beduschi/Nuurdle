import React from "react";
import GuessHistory from "../GuessHistory";
import GuessInput from "../GuessInput";
import GameOverBanner from "../GameOverBanner";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { getSampleProduct } from "../../api";
import { sample } from "../../utils";

function GameBoard({ difficultySettings }) {
  const [guesses, setGuesses] = React.useState([]);
  const [gameState, setGameState] = React.useState("running");
  const [answer, setAnswer] = React.useState();
  const [answerAttributes, setAnswerAttributes] = React.useState({});

  React.useEffect(() => {
    getSampleProduct({
      numOfCharacters: difficultySettings.numOfChars,
    }).then((words) => {
      const word = sample(words);
      setAnswer(word.attributes.name);
      setAnswerAttributes(word.attributes);
      updateGameCSS(difficultySettings);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateGameCSS(difficultySettings) {
    document.documentElement.style.setProperty(
      "--cell-width",
      `${difficultySettings.cellWidth}%`
    );
    document.documentElement.style.setProperty(
      "--cell-font-size",
      `${difficultySettings.cellFontSize}rem`
    );
  }

  function handleGameState(guesses) {
    const currentGuess = guesses[guesses.length - 1];

    if (currentGuess.toLowerCase() === answer.toLowerCase()) {
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
      {!answer && <p>loading...</p>}
      {answer && (
        <>
          <GuessHistory guesses={guesses} answer={answer} />
          <GuessInput
            onGuess={handleGuess}
            gameState={gameState}
            answer={answer}
          />
          {gameState === "won" && (
            <GameOverBanner
              gameState={gameState}
              answser={answer}
              answerAttributes={answerAttributes}
              numOfGuesses={guesses.length}
            />
          )}
          {gameState === "lost" && (
            <GameOverBanner
              gameState={gameState}
              answser={answer}
              answerAttributes={answerAttributes}
              numOfGuesses={guesses.length}
            />
          )}
        </>
      )}
    </>
  );
}

export default GameBoard;
