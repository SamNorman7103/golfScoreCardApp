export const playerOutTemplate = document.getElementById("player-out-template");
export const playerInTemplate = document.getElementById("player-in-template");
export const playerOutContainer = document.getElementById(
  "player-out-container"
);
export const playerInContainer = document.getElementById("player-in-container");
export let playerCount = 0;
export const players = [];
export const playerNames = ["","","",""];

export let player1rows;
export let player2rows;
export let player3rows;
export let player4rows;

export function renderPlayerData(count) {
  for (let player = 1; player <= count; player++) {
    const playerOutElement = playerOutContainer.querySelector(
      `tr:nth-of-type(${player})`
    );
    const playerInElement = playerInContainer.querySelector(
      `tr:nth-of-type(${player})`
    );

    let outTotal = 0;
    let inTotal = 0;

    for (let hole = 1; hole < 19; hole++) {
      if (hole < 10) {
        let outHole = playerOutElement.querySelector(`#p-out-${hole}`);
        outTotal += Number(outHole.value);
      }
      if (hole > 10 && hole < 19) {
        let inHole = playerInElement.querySelector(`#p-in-${hole}`);
        inTotal += Number(inHole.value);
      }
    }

    const outTotalElement = playerOutElement.querySelector(`#p-out-total`);
    outTotalElement.innerText = outTotal;
    const inTotalElement = playerInElement.querySelector("#p-in-total");
    inTotalElement.innerText = inTotal;
  }
}

export function newPlayer() {
  if (playerCount > 3) {
    console.log("Max Players reached");
    return false;
  }
  playerCount++;
  const playerOutElement = document.importNode(playerOutTemplate.content, true);
  const playerInElement = document.importNode(playerInTemplate.content, true);

  playerOutContainer.appendChild(playerOutElement);
  playerInContainer.appendChild(playerInElement);
  const playerOutIdElement = playerOutContainer.querySelector(
    `tr:nth-of-type(${playerCount})`
  );
  const playerInIdElement = playerInContainer.querySelector(
    `tr:nth-of-type(${playerCount})`
  );
  playerOutIdElement.id = `player-${playerCount}`;
  playerInIdElement.id = `player-${playerCount}`;

  const playerNameElement = playerOutContainer;

  players.push([playerOutIdElement, playerInIdElement]);
  if (playerCount == 1) {
    player1rows = players[0];
  }
  if (playerCount == 2) {
    player2rows = players[1];
  }
  if (playerCount == 3) {
    player3rows = players[2];
  }
  if (playerCount == 4) {
    player3rows = players[3];
  }
  renderPlayerData(playerCount);
  $("input").keyup(function () {
    console.log("check");
    renderPlayerData(playerCount);
  });
}
function updatePlayerName(playerElement,str){
    if (playerElement.id == "player-1"){
        playerNames[0] = str;
    }if (playerElement.id == "player-2"){
      playerNames[1] = str;
  }if (playerElement.id == "player-3"){
      playerNames[2] = str;
  }if (playerElement.id == "player-4"){
      playerNames[3] = str;
  }
}
function checkPlayerName(playerElement, name){
    console.log(playerElement.id)
    if (playerElement.id == "player-1") {
        for (let opponent = 1; opponent <= playerCount; opponent++) {
          if ((opponent == 1)) {
            opponent++;
          }
          const opponentName = $(`#player-${opponent}`).find("textarea").val();
          if (
            name.length == opponentName.length &&
            name.toLowerCase() == opponentName.toLowerCase()
          ) {
            name = "";
            $("#player-1").find("textarea").val(name);
            $("#player-1").find("textarea").attr("placeholder", "Name is taken");
            setTimeout(function(){
                $("#player-1").find("textarea").attr("placeholder", "")
            }, 1750 )
          }
        }
      } 
    
}

playerOutContainer.addEventListener("keyup", (e) => {
  const currentPlayerNameElement = e.target.parentNode.parentNode;
  const name = e.target.value;
  updatePlayerName(currentPlayerNameElement,name);
  checkPlayerName(currentPlayerNameElement,name);
});
