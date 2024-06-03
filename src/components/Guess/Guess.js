import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ className, children }) {
  return <span className={`cell ${className}`}>{children}</span>;
}

function Guess({ guess, answer }) {
  const computedGuess = checkGuess(guess, answer);

  return (
    <p className="guess">
      {range(5).map((num) => {
        return computedGuess ? (
          <Cell key={num} className={computedGuess[num].status}>
            {computedGuess[num].letter}
          </Cell>
        ) : (
          <Cell key={num} />
        );
      })}
    </p>
  );
}

export default Guess;
