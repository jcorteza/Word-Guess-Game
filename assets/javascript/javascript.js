/* array to hold album objects */
var albumHolder = [];

/* empty array to add used albums to, to prevent repeat rounds */
var usedTitles = [];

/* function to create album objects */
function setAlbumInfo(title, image, artist, label) {
    var albumObject = {
        albumTitle: title,
        albumImg: image,
        albumArtist: artist,
        albumLabel: label
    }
    return albumObject;
}

/* album objects */
var darkSide = setAlbumInfo("The Dark Side of the Moon", "./assets/images/0.jpg","Pink Floyd", "Harvest Records",);
albumHolder[0] = darkSide;

var blitz = setAlbumInfo("It's Blitz!", "./assets/images/1.jpg", "Yeah Yeah Yeahs", "Interscope Records");
albumHolder[1] = blitz;

var abbeyRd = setAlbumInfo("Abbey Road", "./assets/images/2.jpg", "The Beatles", "Apple Records");
albumHolder[2] = abbeyRd;

var melodrama = setAlbumInfo("Melodrama", "./assets/images/3.jpg", "Lorde", "Republic Records");
albumHolder[3] = melodrama;

var teenageEmotions = setAlbumInfo("Teenage Emotions", "./assets/images/4.jpg", "Lil Yachty", "Motown");
albumHolder[4] = teenageEmotions;

var flowerBoy = setAlbumInfo("Flower Boy", "./assets/images/5.jpg", "Tyler, the Creator", "Columbia Records");
albumHolder[5] = flowerBoy;

var bigFishTheory = setAlbumInfo("Big Fish Theory", "./assets/images/6.jpg", "Vince Staples", "Def Jam Recordings");
albumHolder[6] = bigFishTheory;

var pureComedy = setAlbumInfo("Pure Comedy", "./assets/images/7.jpg", "Father John Misty", "Bella Union‎; ‎Sub Pop");
albumHolder[7] = pureComedy;

var velvetUnderground = setAlbumInfo("The Velvet Underground & Nico", "./assets/images/8.jpg", "The Velvet Underground & Nico", "Verve Records");
albumHolder[8] = velvetUnderground;

var awakenMyLove = setAlbumInfo("Awaken, My Love!", "./assets/images/9.jpg", "Childish Gambino", "Glassnote Records");
albumHolder[9] = awakenMyLove;


/* letter variable for later reference */
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

/* variables to acces HTML elements */
var getRound = document.getElementById("round");
var getWins = document.getElementById("wins");
var getLosses = document.getElementById("losses");
var getGuessesLeft = document.getElementById("guessesLeft");
var getLastGuess = document.getElementById("lastGuess");
var getDisplayText = document.getElementById("displayText");
var getAlbumTitle = document.getElementById("albumName");
var getAlbumArtist = document.getElementById("artist");
var getAlbumLabel = document.getElementById("label");
var getButton = document.getElementById("nextRoundBtn");
var getAlbumInfoList = document.getElementById("albumInfoList");

/* functiont to pick each round's album */
function pickAlbum(albumHolder) {
    var index = (Math.floor(Math.random() * (albumHolder.length)));
    return index;
}

/* functions that update STATS section of page */
function updateGuessLeft(guessesLeft) {
    guessesLeft =  guessesLeft - 1;
    getGuessesLeft.innerHTML = guessesLeft.toString();
    if (guessesLeft === 0) {
        updateLosses();
    }
}

function resetGuessesLeft() {
    guessesLeft = 5;
    getGuessesLeft.innerHTML = guessesLeft;
}

function updateLastGuess(keyPressed) {
    getLastGuess.innerHTML = keyPressed;
}

function updateLosses() {
    losses = parseInt(getLosses.innerHTML);
    losses = losses + 1;
    getLosses.innerHTML = losses;
}

function updateWins() {
    wins = parseInt(getWins.innerHTML);
    wins = wins + 1;
    getWins.innerHTML = wins;
}

function updateRound() {
    round = parseInt(getRound.innerHTML);
    round = round + 1;
    getRound.innerHTML = round;
}

function updateUserGuess(keyPressed) {
    updateLastGuess(keyPressed);
}

function displayAlbumInfo(albumIndex) {
    getAlbumInfoList.setAttribute("class", "list-inline");
    document.getElementById("listRow").setAttribute("class", "row mx-3 my-3 border border-dark py-2");
    getAlbumTitle.innerHTML = albumHolder[albumIndex]["albumTitle"];
    getAlbumArtist.innerHTML = albumHolder[albumIndex]["albumArtist"];
    getAlbumLabel.innerHTML = albumHolder[albumIndex]["albumLabel"];
}

function hideAlbumInfo() {
    document.getElementById("listRow").setAttribute("class", "row mx-3 my-3");
    getAlbumInfoList.setAttribute("class", "list-inline d-none");
}
/* function that converts answer into a usable string */
function makeAnswerString (answerText) {
    for (i = 0; i < answerText.length; i++) {
        if(answerText[i] === " ") {
            answerText[i] = "&nbsp;";
        }
        else if(answerText[i] === ",") {
            answerText[i] = "&#44;";
        }
        else if (answerText[i] === "&") {
            answerText[i] = "&amp;";
        }
    }
    answerText = answerText.toString();
    for (i = 0; i < answerText.length; i++) {
        answerText = answerText.replace(",", " ");
    } 
    return answerText;
}

/* function that sets up page placeholders for each letter */
function gameDisplayText(answerText, getDisplayText) {
    var displayText = [];
    for(i = 0; i < answerText.length; i++) {
        if(letters.includes(answerText[i])) {
            displayText[i] = "&#x5f;"
        }
        else if(answerText[i] === " ") {
            displayText[i] = "&nbsp;";
        }
        else if (answerText[i] === ",") {
            displayText[i] = "&#44;";
        }
        else {
            displayText[i] = answerText[i];
        }  
    }
    displayText = displayText.toString();
    for(i = 0; i < displayText.length; i++) {
        displayText = displayText.replace(",", " ");
    }
    getDisplayText.innerHTML = displayText;
    return displayText;
}

/* function that creates a standard to compare the users answer to to determine if the round is a win */
function compareLetter(answerText, keyPressed, displayText) {
    for(i = 0; i < answerText.length; i++) {
        if(answerText[i] === keyPressed) {
            console.log("inside answertext if statement for loop if statement");
            displayText[i] = answerText[i];
        }
        else if(answerText[i] === ",") {
            displayText[i] = "&#44;";
        }
    }
    return displayText;
}

/* function that updates the gameDisplayText as the user inputs correct answers */
function updateDisplayText(displayText, answerText, keyPressed, guessesLeft) {
    displayText = displayText.split(" ");
    for(i = 0; i < displayText.length; i++) {
        if(displayText[i] === ",") {
            displayText[i] = "&#44;";
        }
    }
    if(answerText.includes(keyPressed)) {
        compareLetter(answerText, keyPressed, displayText)
    }
    else {
        updateGuessLeft(guessesLeft);
    }
    displayText = displayText.join(" ");
    getDisplayText.innerHTML = displayText;
    return displayText;
}

/* function that sets up each new round */
function setupNewRound(albumHolder, getDisplayText, usedTitles) {
    hideAlbumInfo();
    /* checks to see if the current round's album title is included in the usedTitles array. If not, it adds it to the array*/
    getButton.setAttribute("class", "btn btn-warning d-none")
    console.log("inside setupnewround function");
    do {
        albumIndex = pickAlbum(albumHolder);
    } while (usedTitles.includes(albumIndex));
    var currentAlbum = albumHolder[albumIndex]["albumTitle"];
    var currentImg = albumHolder[albumIndex]["albumImg"];
    usedTitles.push(albumIndex);
    document.getElementById("albumImg").setAttribute("src", currentImg);
    var answerText = Array.from(currentAlbum.toLowerCase());
    displayText = gameDisplayText(answerText, getDisplayText);
    titleComparison = makeAnswerString(answerText);
    return answerText;
}

/* javascript code for game */
answerText = setupNewRound(albumHolder, getDisplayText, usedTitles);
/* key up even listener begins */
document.addEventListener("keyup", function playerGuess(event) {
    console.log("Inside event listener."); 
    console.log(answerText);
    displayText = getDisplayText.innerHTML;
    var keyPressed = event.key;
    updateUserGuess(keyPressed); 
    var guessesLeft = parseInt(getGuessesLeft.innerHTML)
    displayText = updateDisplayText(displayText, answerText, keyPressed, guessesLeft);
    if(titleComparison === displayText) {
        updateWins();
        displayAlbumInfo(albumIndex);
        if (usedTitles.length < albumHolder.length) {
            updateRound();
            resetGuessesLeft();
            getButton.setAttribute("class", "btn btn-warning")
            getButton.addEventListener("click", function() {
                return answerText = setupNewRound(albumHolder, getDisplayText, usedTitles);
            });
        }
        else {
            document.removeEventListener("keyup", playerGuess);
            alert("You won the game!");
            alert("Refresh the page to start a new game.");
        }
    }
    else if (guessesLeft === 0) {
        displayAlbumInfo(albumIndex);
        losses = parseInt(getLosses.innerHTML);
        if (losses < 3) {
            updateRound();
            resetGuessesLeft();
            getButton.setAttribute("class", "btn btn-warning");
            getButton.addEventListener("click", function() {
                return answerText = setupNewRound(albumHolder, getDisplayText, usedTitles);
            });
        }
        else {
            document.removeEventListener("keyup", playerGuess);
            alert("You lost the game :(");
            alert("Refresh the page to start a new game");
        }
    }
});

/*Really need a toString function of my own to standardize the album title names because all of the symbols and having multiple words per answer made verything more complicated.

Also need a to array function that will turn the string into an array that works with my code this would eliminate the need for all these for loops which only serve to standardize the strings and arrays to match answers to display text.

For some reason when the user loses, the code waits for the event listner before running the code in if (losses < 3). I'd probably need to move this section somehow to fix it.

The last thing to do would be to add styling to the page, and I'd want to play songs from the current round's album if possible, but that will be for later. */
