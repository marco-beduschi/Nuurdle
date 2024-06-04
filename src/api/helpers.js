function getRandomPage(max, exclude = []) {
  if (typeof max !== "number" || max < 1) {
    throw new Error(
      "The first argument must be a positive integer greater than or equal to 1"
    );
  }
  if (!Array.isArray(exclude)) {
    throw new Error("The second argument must be an array of integers");
  }

  // Filter out invalid numbers in the exclude array
  exclude = exclude.filter(
    (num) => Number.isInteger(num) && num >= 1 && num <= max
  );

  // Create an array of possible values
  const possibleValues = [];
  for (let i = 1; i <= max; i++) {
    if (!exclude.includes(i)) {
      possibleValues.push(i);
    }
  }

  // If no possible values left, throw an error
  if (possibleValues.length === 0) {
    throw new Error("No possible values left to return");
  }

  // Return a random value from the possible values
  const randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
}

export { getAllPages, getRandomPage };
