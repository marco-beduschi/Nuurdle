import React from "react";

function Link({ url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      Buy Game
    </a>
  );
}

function GameOverBanner({
  numOfGuesses,
  answser,
  answerAttributes,
  gameState,
}) {
  console.log(answerAttributes);
  const selectedImg =
    answerAttributes.images.banner?.url ||
    answerAttributes.images.background.url;

  const backgroundImage = `url(${selectedImg})`;

  return gameState === "won" ? (
    <div className="happy banner">
      <img src={selectedImg} alt="" />
      <div className="banner-body">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{numOfGuesses} guesses</strong>.
        </p>
        <Link url={answerAttributes["store_url"]} />
      </div>
    </div>
  ) : (
    <div className="sad banner">
      <img src={selectedImg} alt="" />
      <div className="banner-body">
        <p>
          Sorry, the correct answer is <strong>{answser}</strong>.
        </p>
        <Link url={answerAttributes["store_url"]} />
      </div>
    </div>
  );
}

export default GameOverBanner;
