import { displayMap } from "./map.js";
import { getQuestion } from "./trivia.js"

const hamburger = document.querySelector(".menu");
const nav = document.querySelector(".menu-list");
const year = document.querySelector(".year");
const stats = document.querySelector("#stats")
const heading = document.querySelector("#stat-head")
const r_holder = document.querySelector(".response")
const prev = document.querySelector("#prev-qstns");
const btn = document.querySelector("button");
let score = localStorage.getItem("score");
let qstnz = localStorage.getItem("prev-qstns");

getQuestion().then((coords) => displayMap(coords));

if (!score) {
  heading.style.display = "none";
} else {
  const numbers = score.split("/");
  const correct = numbers[0];
  const total = numbers[1];
  stats.innerHTML = `<p>Total: &nbsp;&nbsp;${total}</p> <br> <p>Correct:&nbsp;&nbsp; ${correct}</p> <br> <p>Wrong: &nbsp;&nbsp;${total - correct} </p>`;
  let ul = document.createElement("ul");
  JSON.parse(qstnz)?.forEach((q) => {
        const li = document.createElement("li");
        let span = document.createElement("span")        
        li.innerHTML = q.question;
        span.innerHTML = q.correct ?  "✓" : "✕";
        span.style.color = q.correct ? "green" : "red";
        span.style.marginLeft = "0.5rem";
        li.appendChild(span);
        ul.appendChild(li);
      })
  prev.innerHTML = "";
  prev.appendChild(ul);
}

btn.addEventListener('click', async () => {
  r_holder.style.backgroundColor = "";
  await getQuestion().then((coords) => displayMap(coords));
})

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("show");
});

year.innerHTML = `${new Date().getFullYear()}`

