import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ className, children }) {
  return <span className={`cell ${className}`}>{children}</span>;
}

function DisabledCell({ children }) {
  return <Cell className="cell-disabled">{children}</Cell>;
}

function Guess({ guess, answer }) {
  const computedGuess = checkGuess(guess, answer);

  function isLetter(letter) {
    const onlyLettersRegex = new RegExp(/[a-zA-Z\u00C0-\u00FF]/g);

    return onlyLettersRegex.test(letter.trim());
  }

  return (
    <p className="guess">
      {range(answer.length).map((num) => {
        return !isLetter(answer[num]) ? (
          <DisabledCell key={num}>{answer[num]}</DisabledCell>
        ) : (
          <>
            {computedGuess && (
              <Cell key={num} className={computedGuess[num].status}>
                {computedGuess[num].letter}
              </Cell>
            )}
            {!computedGuess && <Cell key={num} />}
          </>
        );
      })}
    </p>
  );
}

export default Guess;
