const playerOutTemplate = document.getElementById("player-out-template");
const playerInTemplate = document.getElementById("player-in-template");
const playerOutContainer = document.getElementById(
  "player-out-container"
);
const playerInContainer = document.getElementById("player-in-container");
let playerCount = 0;

function renderPlayerScores(count) {
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

  renderPlayerScores(playerCount);
  $("input").keypress(function (e) {
    var charCode = e.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
      e.preventDefault();
    }
  });
  $("input").keyup(function () {
    renderPlayerScores(playerCount);
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

playerOutContainer.addEventListener("keyup", (e) => {
  const currentPlayerNameElement = e.target.parentNode.parentNode;
  const name = e.target.value;
  checkPlayerName(currentPlayerNameElement, name);
});
