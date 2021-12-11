const guessedLettersElement = document.querySelector(".guessed-letters"); // ul
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const label = document.querySelector(".guess-form label");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = []; //global variable for player guesses
let remainingGuesses = 8;

// async function
const getWord = async function () {
    const response = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await response.text(); 
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord(); // starts the game

// function to add placeholders for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); // join all array elements into a string
};

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
        message.innerText = "Only one letter please!";
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
        message.innerText = "You already guessed that letter, silly. Try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        remainingGuessCount(guess);
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

// function to count guesses remaining
const remainingGuessCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, this word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! This word has the letter ${guess}.`;
    }
    
    if (remainingGuesses === 0) {
        message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>. Try again? <span class="emoji"> 🤷🏻‍♀️ </span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// winner function
const winnerWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">Yay, you got it!! Congrats!! <span class="emoji"> 🎉 </span></p>`;
        startOver();
    }
};

// function hide and show elements
const startOver = function () {
    guessButton.classList.add("hide");
    letterInput.classList.add("hide"); // remove input box 
    label.classList.add("hide"); // remove "type letter" 
    remainingGuessesDisplay.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// play again?
playAgainButton.addEventListener("click", function() {
    // reset all values
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters = [];
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    // grab new word
    getWord();

    //show the right elements
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesDisplay.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    letterInput.classList.remove("hide");
    label.classList.remove("hide");
});