import React from "react";

function GameOverBanner({ hasWon, numOfGuesses, answser }) {
  return hasWon ? (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{numOfGuesses} guesses</strong>.
      </p>
    </div>
  ) : (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answser}</strong>.
      </p>
    </div>
  );
}

export default GameOverBanner;
