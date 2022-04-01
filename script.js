//Name of the player
let playerName = prompt(" Quelle est votre pseudo ? ");
const pName = document.querySelector(".player_name");
pName.innerText = playerName + " :";
const secondPlayer = document.querySelector(".bot");
secondPlayer.innerText = "Bot " + ":";

const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif;
let gameSymbol;
let scorePlayer = 0;
let scoreBot = 0;

let etatJeu = ["", "", "", "", "", "", "", "", ""];

//Victory conditions
const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Message
const gagne = () => `Le joueur ${joueurActif} a gagné`;
const egalite = () => "Egalité";
const tourJoueur = () => `C'est au tour de ${joueurActif}`;

//Choose of who play in first
let firstPlayer = prompt(" Voulez-vous jouer en premier ? (oui ou non)");
if (firstPlayer === "oui") {
  joueurActif = playerName;
} else {
  joueurActif = secondPlayer;
}

statut.innerHTML = tourJoueur();

document
  .querySelectorAll(".box")
  .forEach((cell) => cell.addEventListener("click", gestionClicCase));
document
  .querySelector("#restart_button")
  .addEventListener("click", recommencer);

// This function manage the click on the game box
function gestionClicCase() {
  const indexCase = parseInt(this.dataset.index);

  // We verify if the box is filled or if the game is finished
  if (etatJeu[indexCase] !== "" || !jeuActif) {
    return;
  }

  // We write the right symbol in the right box
  if (joueurActif === playerName) {
    gameSymbol = "X";
  } else {
    gameSymbol = "O";
  }
  etatJeu[indexCase] = joueurActif;
  this.innerHTML = gameSymbol;

  verifGagne();
}

// This function verify if a player won
function verifGagne() {
  let tourGagnant = false;

  // we look at all the victory condition possible
  for (let conditionVictoire of conditionsVictoire) {
    let val1 = etatJeu[conditionVictoire[0]];
    let val2 = etatJeu[conditionVictoire[1]];
    let val3 = etatJeu[conditionVictoire[2]];

    // 1 box is empty
    if (val1 === "" || val2 === "" || val3 === "") {
      continue;
    }

    // 3 boxes are filled
    if (val1 === val2 && val2 === val3) {
      tourGagnant = true;
      break;
    }
  }

  // If win
  if (tourGagnant) {
    gamePlayed = gameNumber + 1;
    statut.innerHTML = gagne();
    jeuActif = false;
    return;
  }

  // Egality = all box are filled
  if (!etatJeu.includes("")) {
    statut.innerHTML = egalite();
    jeuActif = false;
    return;
  }

  // Change player
  joueurActif = joueurActif === playerName ? secondPlayer : playerName;
  if (joueurActif === secondPlayer) {
    joueurActif = "Bot";
  } else {
    joueurActif = playerName;
  }
  statut.innerHTML = tourJoueur();
}

// Game restart function
function recommencer() {
  joueurActif = playerName;
  jeuActif = true;
  etatJeu = ["", "", "", "", "", "", "", "", ""];
  statut.innerHTML = tourJoueur();
  document.querySelectorAll(".box").forEach((cell) => (cell.innerHTML = ""));
}

/*
Bot fonction try
  let maxPlay = 9;
  Random number for bot play
  maxPlay = Math.floor(Math.random() * 9);
*/

/*
Score of player try
    if (playerName === joueurActif) {
      scorePlayer = scorePlayer + 1;
      const scorePlayerWrite = document.querySelector(".player_score");
      scorePlayerWrite.innerText = scorePlayer;
    }
    if (secondPlayer === joueurActif) {
      scoreBot = scoreBot + 1;
      const scoreBotWrite = document.querySelector(".bot_score");
      scoreBotWrite.innerText = scoreBot;
    }
*/

/*
Number of game played try
    let numberGame = 0;
    const gameNumber = document.querySelector(".game_number");
    gameNumber.innerText = numberGame;
    function gamePlayed() {
    gameNumber.innerText = numberGame;
    }
    gamePlayed = gameNumber + 1;
*/
