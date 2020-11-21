export const coursePromise = fetch(
  "https://golf-courses-api.herokuapp.com/courses/"
).then((response) => response.json());
const courseSelectContainer = document.getElementById("course-select");
export let selectedCourse = {};
export function printCourses(data) {
  let html = `
        <span style="padding-top: 10px;">Courses:</span>
        <button onclick="course.renderCourse(1)" id="course-1">${data.courses[0].name}</button>
        <button onclick="course.renderCourse(2)" id="course-2">${data.courses[1].name}</button>
        <button onclick="course.renderCourse(3)" id="course-3">${data.courses[2].name}</button>
        `;
  courseSelectContainer.innerHTML += html;
}

function teeSelect(tee){
  
}

export function renderCourse(course) {
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

export function getCourse(course) {
  return fetch(
    `https://golf-courses-api.herokuapp.com/courses/${course}`
  ).then((response) => response.json()
    
  );
}

function renderCoursePar(holes) {
  let outTotal = 0;
  let inTotal = 0;
  const parOutTotal = document.getElementById("par-out-total");
  const parInTotal = document.getElementById("par-in-total");
  for (let i = 0; i < holes.length; i++) {
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

export function renderCourseYards(holes, tee) {
  let outTotal = 0;
  let inTotal = 0;
  const yardsOutTotal = document.getElementById("yards-out-total");
  const yardsInTotal = document.getElementById("yards-in-total");
  for (let i = 0; i < holes.length; i++) {
    if (i < 9) {
      const yardsElement = document.getElementById(`yards-${i + 1}`);
      yardsElement.innerText = holes[i].teeBoxes[tee].yards;
      outTotal += holes[i].teeBoxes[tee].yards;
    }
    if (i > 8) {
      const yardsElement = document.getElementById(`yards-${i + 1}`);
      yardsElement.innerText = holes[i].teeBoxes[tee].yards;
      inTotal += holes[i].teeBoxes[tee].yards;
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
  for (let i = 0; i < holes.length; i++) {
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
  selectedCourse = holes;
  renderCoursePar(holes);
  renderCourseYards(holes, 0);
  renderCourseHandicap(holes);
}
