const playerOutTemplate = document.getElementById("player-out-template");
const playerInTemplate = document.getElementById("player-in-template");
const playerOutContainer = document.getElementById(
  "player-out-container"
);
const playerInContainer = document.getElementById("player-in-container");
let playerCount = 0;

playerOutContainer.addEventListener("keyup", (e) => {
  const currentPlayerNameElement = e.target.parentNode.parentNode;
  const name = e.target.value;
  checkPlayerName(currentPlayerNameElement, name);
});

function renderPlayerScores(count) {
  for (let player = 1; player <= count; player++) {
    const outRow = playerOutContainer.querySelector(
      `tr:nth-of-type(${player})`
    );
    const inRow = playerInContainer.querySelector(
      `tr:nth-of-type(${player})`
    );

    let outTotal = 0;
    let inTotal = 0;

    for (let hole = 1; hole < 19; hole++) {
      if (hole < 10) {
        let outHole = outRow.querySelector(`#p-out-${hole}`);
        outTotal += Number(outHole.value);
      }
      if (hole > 9 && hole < 19) {
        let inHole = inRow.querySelector(`#p-in-${hole}`);
        inTotal += Number(inHole.value);
      }
    }

    const outTotalElement = outRow.querySelector(`#p-out-total`);
    outTotalElement.innerText = outTotal;
    const inTotalElement = inRow.querySelector("#p-in-total");
    inTotalElement.innerText = inTotal;
  }
}

function checkComplete(e){
  let gameCompleted = false;
  const player = e.target.parentNode.parentNode;
  const id = player.id;
  const playerName = $(`#${id}`).find("textarea").val();
  const outRow = playerOutContainer.querySelector(`#${id}`)
  const inRow = playerInContainer.querySelector(`#${id}`);
  const outTotal = Number(outRow.querySelector(`#p-out-total`).innerText);
  const inTotal = Number(inRow.querySelector(`#p-in-total`).innerText);
  const playerScore = outTotal + inTotal;
  const overall = playerScore - 72;

  for (let hole = 1; hole < 19; hole++) {
    if (hole < 10) {
      let outHole = outRow.querySelector(`#p-out-${hole}`);
      if (outHole.value == ""){
        return (gameCompleted)
      }
    }
    if (hole > 9 && hole < 19) {
      let inHole = inRow.querySelector(`#p-in-${hole}`);
      if (inHole.value == ""){
        return (gameCompleted)
      }
    }
  }
  gameCompleted = true;
  
  if (gameCompleted == true){
    if (overall > 0){
      console.log(`${playerName} you were over par by +${overall} with a score of ${playerScore}. Better luck next time`);
    } else if (overall < 0){
      console.log(`${playerName} you were under par by ${overall} with a score of ${playerScore}. On to the PGA!`);
    } else {
      console.log(`${playerName} you were on par with a score of ${playerScore}. Well done!`);
    }
  }
}

export function newPlayer() {
  if (playerCount > 3) {
    console.log("Max Players reached");
    return false;
  }
  playerCount++;
  const outRow = document.importNode(playerOutTemplate.content, true);
  const inRow = document.importNode(playerInTemplate.content, true);

  playerOutContainer.appendChild(outRow);
  playerInContainer.appendChild(inRow);
  const playerOutElement = playerOutContainer.querySelector(
    `tr:nth-of-type(${playerCount})`
  );
  const playerInElement = playerInContainer.querySelector(
    `tr:nth-of-type(${playerCount})`
  );
  playerOutElement.id = `player-${playerCount}`;
  playerInElement.id = `player-${playerCount}`;

  renderPlayerScores(playerCount);
  $("input").keypress(function (e) {
    var charCode = e.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
      e.preventDefault();
    }
  });
  $("input").keyup(function (e) {
    renderPlayerScores(playerCount);
    checkComplete(e);
  });
}

function checkPlayerName(playerElement, name) {
  if (playerElement.id == "player-1") {
    for (let opponent = 1; opponent < playerCount; opponent++) {
      if (opponent == 1) {
        opponent++;
      }
      const opponentName = $(`#player-${opponent}`).find("textarea").val();
      if (opponentName == ""){
        opponent++;
      }
      else if (
        name.length == opponentName.length &&
        name.toLowerCase() == opponentName.toLowerCase()
      ) {
        name = "";
        $("#player-1").find("textarea").val(name);
        $("#player-1").find("textarea").attr("placeholder", "Name is taken");
        setTimeout(function () {
          $("#player-1").find("textarea").attr("placeholder", "");
        }, 1750);
      }
    }
  } else if (playerElement.id == "player-2") {
    for (let opponent = 1; opponent < playerCount; opponent++) {
      if (opponent == 2) {
        opponent++;
      }
      const opponentName = $(`#player-${opponent}`).find("textarea").val();
      if (opponentName == ""){
        opponent++;
      }
      else if (
        name.length == opponentName.length &&
        name.toLowerCase() == opponentName.toLowerCase()
      ) {
        name = "";
        $("#player-2").find("textarea").val(name);
        $("#player-2").find("textarea").attr("placeholder", "Name is taken");
        setTimeout(function () {
          $("#player-2").find("textarea").attr("placaeholder", "");
        });
      }
    }
  } else if (playerElement.id == "player-3") {
    for (let opponent = 1; opponent < playerCount; opponent++) {
      if (opponent == 3) {
        opponent++;
      }
      const opponentName = $(`#player-${opponent}`).find("textarea").val();
      if (opponentName == ""){
        opponent++;
      }
      else if (
        name.length == opponentName.length &&
        name.toLowerCase() == opponentName.toLowerCase()
      ) {
        name = "";
        $("#player-3").find("textarea").val(name);
        $("#player-3").find("textarea").attr("placeholder", "Name is taken");
        setTimeout(function () {
          $("#player-3").find("textarea").attr("placaeholder", "");
        });
      }
    }
  } else if (playerElement.id == "player-4") {
    for (let opponent = 1; opponent < playerCount; opponent++) {
      if (opponent == 4) {
        break;
      }
      const opponentName = $(`#player-${opponent}`).find("textarea").val();
      if (opponentName == ""){
        opponent++;
      }
      else if (
        name.length == opponentName.length &&
        name.toLowerCase() == opponentName.toLowerCase()
      ) {
        name = "";
        $("#player-4").find("textarea").val(name);
        $("#player-4").find("textarea").attr("placeholder", "Name is taken");
        setTimeout(function () {
          $("#player-4").find("textarea").attr("placaeholder", "");
        });
      }
    }
  }
}


