const guessedLettersElement = document.querySelector(".guessed-letters"); // ul
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = []; //global variable for player guesses

// function to add placeholders for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); // join all array elements into a string
};

placeholder(word);

// Event handler for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //prevent reload
    message.innerText = ""; //empty message paragraph
    const guess = letterInput.value; //grab what was entered in the input
    const goodGuess = validateInput(guess); // make sure it's a single letter
        if (goodGuess) {
            makeGuess(guess);
        }
    letterInput.value = ""; // empty value
});

// function to check and validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; //regular expression
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A - Z.";
    } else {
        return input;
    }
};

// function to capture input 
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWip(guessedLetters);
    }
};

// letters that player guessed function
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } // create new list item for each letter inside guessedLetters array and add to ul
};

// function to update the word in progress (Wip)
const updateWip = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); // variable to split the word string into an array so the letters can appear in the gL array
    const wordReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase());
        } else {
            wordReveal.push("●");
        }
    }
    wordInProgress.innerText = wordReveal.join("");
    winnerWinner();
};

// winner function
const winnerWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="hightlight">You correctly guessed the word! Congrats!</p>`;
    }
};