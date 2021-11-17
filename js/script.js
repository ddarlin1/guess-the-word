const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// function to add placeholders for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// add Event Listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //prevent reload
    const guess = letterInput.value; 
    console.log(guess); // log out variable capturing input
    letterInput.value = ""; // empty value
});
