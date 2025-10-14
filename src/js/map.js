// import { getCoordinates } from "./geolocation";
// const street = "68 Plein Street";
// const area = "Sunnyside";
// const city = "Pretoria";
// const coords = await getCoordinates(`${street}, ${area}, ${city}`);
// console.log(coords.latitude);
// var map = L.map('map').setView([coords.latitude, coords.longitude], 13);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors"
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup(area)
//     .openPopup();

import { getQuestions } from "trivia";

const questions = getQuestions(5, "medium");
const q_holder = document.querySelector(".question");
const r_holder = document.querySelector(".response");
let index = 0;

export async function askQuestion() {
  q_holder.innerHTML = questions.results[index].question;
  let answers = questions.results[index].incorrect_answers;
  let correct = questions.results[index].correct_answer;
  answers.push(correct);
  answers.sort();
  answers.forEach((answer) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    const p = document.createElement("p");
    p.innerHTML = answer;
    radio.type = "radio";
    radio.name = index;
    radio.value = answer;
    label.appendChild(radio);
    label.append(p);
    r_holder.appendChild(label);
  });

  return correct;
}
