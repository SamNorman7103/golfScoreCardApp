const coursePromise = fetch(
  "https://golf-courses-api.herokuapp.com/courses/"
).then((response) => response.json());
const courseSelectContainer = document.getElementById("course-select");
const playerOutTemplate = document.getElementById("player-out-template");
const playerInTemplate = document.getElementById("player-in-template");
const playerOutContainer = document.getElementById("player-out-container");
const playerInContainer = document.getElementById("player-in-container");
let playerCount = 0;

coursePromise.then((response) => printCourses(response));

function printCourses(data) {
  let html = `
        <h1>Courses</h1>
        <p><button onclick="renderCourse(1)" id="course-1">Course 1</button> ${data.courses[0].name}</p>
        <p><button onclick="renderCourse(2)" id="course-2">Course 2</button> ${data.courses[1].name}</p>
        <p><button onclick="renderCourse(3)" id="course-3">Course 3</button> ${data.courses[2].name}</p>
        `;
  courseSelectContainer.innerHTML += html;
}

function renderCourse(course) {
  if (course == 1) {
    coursePromise
      .then((response) => getCourse(response.courses[0].id))
      .then((response) => renderCourseData(response.data.holes));
  }
  if (course == 2) {
    coursePromise
      .then((response) => getCourse(response.courses[1].id))
      .then((response) => renderCourseData(response.data.holes));
  }
  if (course == 3) {
    coursePromise
      .then((response) => getCourse(response.courses[2].id))
      .then((response) => renderCourseData(response.data.holes));
  }
}

function getCourse(course) {
  return fetch(
    `https://golf-courses-api.herokuapp.com/courses/${course}`
  ).then((response) => response.json());
}

function renderCoursePar(holes) {
  let outTotal = 0;
  let inTotal = 0;
  const parOutTotal = document.getElementById("par-out-total");
  const parInTotal = document.getElementById("par-in-total");
  for (i = 0; i < holes.length; i++) {
    if (i <= 8) {
      const parElement = document.getElementById(`par-${i + 1}`);
      parElement.innerText = holes[i].teeBoxes[0].par;
      outTotal += holes[i].teeBoxes[0].par;
    }
    if (i >= 9) {
      const parElement = document.getElementById(`par-${i + 1}`);
      parElement.innerText = holes[i].teeBoxes[0].par;
      inTotal += holes[i].teeBoxes[0].par;
    }
  }
  parOutTotal.innerText = outTotal;
  parInTotal.innerText = inTotal;
}

function renderCourseYards(holes) {
  let outTotal = 0;
  let inTotal = 0;
  const yardsOutTotal = document.getElementById("yards-out-total");
  const yardsInTotal = document.getElementById("yards-in-total");
  for (i = 0; i < holes.length; i++) {
    if (i < 9) {
      const yardsElement = document.getElementById(`yards-${i + 1}`);
      yardsElement.innerText = holes[i].teeBoxes[0].yards;
      outTotal += holes[i].teeBoxes[0].yards;
    }
    if (i > 8) {
      const yardsElement = document.getElementById(`yards-${i + 1}`);
      yardsElement.innerText = holes[i].teeBoxes[0].yards;
      inTotal += holes[i].teeBoxes[0].par;
    }
  }
  yardsOutTotal.innerText = outTotal;
  yardsInTotal.innerText = inTotal;
}

function renderCourseHandicap(holes) {
  let outTotal = 0;
  let inTotal = 0;
  const handicapOutTotal = document.getElementById("handicap-out-total");
  const handicapInTotal = document.getElementById("handicap-in-total");
  for (i = 0; i < holes.length; i++) {
    if (i < 9) {
      const handicapElement = document.getElementById(`handicap-${i + 1}`);
      handicapElement.innerText = holes[i].teeBoxes[0].hcp;
      outTotal += holes[i].teeBoxes[0].hcp;
    }
    if (i > 8) {
      const handicapElement = document.getElementById(`handicap-${i + 1}`);
      handicapElement.innerText = holes[i].teeBoxes[0].hcp;
      inTotal += holes[i].teeBoxes[0].hcp;
    }
  }
  handicapOutTotal.innerText = outTotal;
  handicapInTotal.innerText = inTotal;
}

function renderCourseData(holes) {
  renderCoursePar(holes);
  renderCourseYards(holes);
  renderCourseHandicap(holes);
}

function newPlayer() {
  if(playerCount > 3){
    console.log('Max Players reached');
    return false;
  }
  playerCount++;
  const playerOutElement = document.importNode(playerOutTemplate.content, true);
  const playerInElement = document.importNode(playerInTemplate.content, true);

  playerOutContainer.appendChild(playerOutElement);
  playerInContainer.appendChild(playerInElement);
  const playerOutIdElement = playerOutContainer.querySelector(`tr:nth-of-type(${playerCount})`);
  const playerInIdElement = playerInContainer.querySelector(`tr:nth-of-type(${playerCount})`);
  playerOutIdElement.id = `player-${playerCount}`;
  playerInIdElement.id = `player-${playerCount}`;
  renderPlayerData(playerCount);
  $("input").keyup(function(){
    console.log('check')
    renderPlayerData(playerCount)
  });
}

function renderPlayerData(count){
  for (let player = 1; player <= count; player++) {
    const playerOutElement = playerOutContainer.querySelector(`tr:nth-of-type(${player})`);
    const playerInElement = playerInContainer.querySelector(`tr:nth-of-type(${player})`);
    
    let outTotal = 0;
    let inTotal = 0;

    for (hole = 1; hole < 19; hole++){
      if(hole < 10){
        let outHole = playerOutElement.querySelector(`#p-out-${hole}`);
        outTotal += Number(outHole.value);
      }
      if(hole > 10 && hole < 19){
        let inHole = playerInElement.querySelector(`#p-in-${hole}`);
        inTotal += Number(inHole.value);
      }
    }
    const outTotalElement = playerOutElement.querySelector(`#p-out-total`);
    outTotalElement.value = outTotal;
    const inTotalElement = playerInElement.querySelector('#p-in-total');
    inTotalElement.value = inTotal;
  }
}





    

