import React from "react";

import GameBoard from "../GameBoard";
import MainMenu from "../MainMenu";
import { DIFFICULTY_SETTINGS } from "../../constants";

function Game() {
  const [difficulty, setDifficulty] = React.useState();

  if (difficulty === undefined) {
    return (
      <MainMenu
        onDifficultyChange={(difficulty) => setDifficulty(difficulty)}
      />
    );
  } else {
    return <GameBoard difficultySettings={DIFFICULTY_SETTINGS[difficulty]} />;
  }
}

export default Game;
