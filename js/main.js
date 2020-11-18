import * as course from "./course.js";
import * as player from "./player.js";

window.course = course;
window.player = player;

course.coursePromise.then((response) => course.printCourses(response));

