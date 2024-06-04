import React from "react";

function MainMenu({ onDifficultyChange }) {
  return (
    <select
      onChange={(e) => onDifficultyChange(e.target.value)}
      defaultValue=""
    >
      <option disabled value="">
        Select a difficulty
      </option>
      <option value="easy">Easy ("8 word" words)</option>
      <option value="medium">Medium ("12 word" words)</option>
      <option value="hard">Hard ("16 word" words)</option>
    </select>
  );
}

export default MainMenu;
