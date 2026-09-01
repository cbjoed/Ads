const time = document.querySelector("#time");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const duration = document.querySelector("#duration");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");

let seconds = Number(localStorage.getItem("focus-seconds")) || Number(duration.value) * 60;
let timerId;
let tasks = JSON.parse(localStorage.getItem("focus-tasks") || "[]");

function renderTime() {
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  time.textContent = `${minutes}:${remainder}`;
  document.title = timerId ? `${time.textContent} - Focus Timer` : "Focus Timer";
  localStorage.setItem("focus-seconds", seconds);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = undefined;
  start.textContent = "Start";
  document.title = "Focus Timer";
}

function renderTasks() {
  list.replaceChildren();
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = task.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark ${task.text} complete`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
    });

    const label = document.createElement("label");
    label.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    item.append(checkbox, label, remove);
    list.append(item);
  });

  const remaining = tasks.filter((task) => !task.done).length;
  count.textContent = `${remaining} remaining`;
}

function saveTasks() {
  localStorage.setItem("focus-tasks", JSON.stringify(tasks));
  renderTasks();
}

start.addEventListener("click", () => {
  if (timerId) {
    stopTimer();
    return;
  }

  timerId = setInterval(() => {
    if (seconds <= 1) {
      seconds = Number(duration.value) * 60;
      stopTimer();
      alert("Focus session complete!");
    } else {
      seconds -= 1;
    }
    renderTime();
  }, 1000);
  start.textContent = "Pause";
});

reset.addEventListener("click", () => {
  stopTimer();
  seconds = Number(duration.value) * 60;
  renderTime();
});

duration.addEventListener("change", () => {
  if (!timerId) {
    seconds = Number(duration.value) * 60;
    renderTime();
  }
  localStorage.setItem("focus-duration", duration.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = "";
  saveTasks();
});

duration.value = localStorage.getItem("focus-duration") || duration.value;
renderTime();
renderTasks();
