import { getCoordinates } from "./geolocation.js";

const q_holder = document.querySelector(".question");
const r_holder = document.querySelector(".response");
const baseUrl = "https://opentdb.com/api.php";
const prev = document.querySelector("#prev-qstns");
const stats = document.querySelector("#stats")
const heading = document.querySelector("#stat-head")
const btn = document.querySelector("button");
const nlp = window.nlp;
let score = localStorage.getItem("score");
let previousQstns = localStorage.getItem('prev-qstns') || [];
let pastQstns = [];
let attempts = parseInt(score.split("/")[1]);
let success = parseInt(score.split("/")[0]);

export async function getQuestion() {
  try {
    const question = await axios.get(
      `${baseUrl}?amount=1&category=22&difficulty=medium&type=multiple`,
    );
    const data = question.data.results[0];
    displayQuestion(data);
    const coords = await detectPlace(data.question, data.correct_answer);
    return coords;
  } catch (error) {
    return console.log(error);
  }
}

function displayQuestion(qstn) {
  q_holder.innerHTML = '';
  r_holder.innerHTML = '';
  q_holder.innerHTML = qstn.question;
  let answers = qstn.incorrect_answers;
  let correct = qstn.correct_answer;
  if (!answers.includes(correct))
    answers.push(correct);
  answers.sort();
  if (previousQstns.length > 0) 
    pastQstns = JSON.parse(localStorage.getItem("prev-qstns"))  || [];
  btn.disabled = true;
  handleResponse(qstn, answers);
}

function handleResponse(qstn, answers) {
  answers.forEach((answer) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.classList.add('selector');
    const p = document.createElement("p");
    p.innerHTML = answer;
    radio.type = "radio";
    radio.name = "options";
    radio.value = answer;
    radio.addEventListener('change', () => {
      const radios = document.querySelectorAll('input[name="options"]');
      radios.forEach((r) => r.disabled = true);
      btn.disabled = false;      
      let aced = false;
      attempts++;
      if (qstn.correct_answer === radio.value) {
        r_holder.style.backgroundColor = "#cbf7d5"
        aced = true;
        success++;
      } else {
        r_holder.style.backgroundColor = "#ffdcd8ff";
      }

      pastQstns.push({"question":qstn.question, "correct":aced});
      localStorage.setItem('prev-qstns', JSON.stringify(pastQstns.slice(-5)));
      previousQstns = JSON.parse(localStorage.getItem('prev-qstns'));
      const ul = document.createElement("ul");
      let span;
      if (previousQstns.length > 0) {
        previousQstns.forEach((q) => {
          const li = document.createElement("li");
          span = document.createElement("span")        
          li.innerHTML = q.question;
          span.innerHTML = q.correct ?  "✓" : "✕";
          span.style.color = q.correct ? "green" : "red";
          span.style.marginLeft = "0.5rem";
          li.appendChild(span);
          ul.appendChild(li);
        })
      }
      prev.innerHTML = "";
      prev.appendChild(ul);
      score = localStorage.setItem('score', `${success}/${attempts}`)
      updateStats();        
    });
    label.appendChild(radio);
    label.append(p);
    r_holder.appendChild(label);
  });
}

function updateStats() {
  heading.style.display = "block"
  score = localStorage.getItem('score');
  const numbers = score.split("/");
  const correct = numbers[0];
  const total = numbers[1];
  stats.innerHTML = `<p>Total: &nbsp;&nbsp;${total}</p> <br> <p>Correct:&nbsp;&nbsp; ${correct}</p> <br> <p>Wrong: &nbsp;&nbsp;${total - correct} </p>`
}


async function detectPlace(text, alt) {
  const doc = nlp(text);
  let places = doc.places().out('array');
  if (places.length == 0)
    places = nlp(alt).places().out('array');
  
  if (places.length > 0) {
    const place = getCoordinates([...places]);  
    return place;
  }

  //In case all else fails, show them my home town :-)
  return {
    "country":"South Africa",
    "latitude":-25.7531683,
    "longitude":28.1595743,
    "name":"Africa"
  };
}
