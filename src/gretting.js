const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  clock = document.querySelector(".clock"),
  footer = document.querySelector("footer"),
  todoList = document.querySelector(".todoList");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

const handleSubmitNewGreeting = (event) => {
  if (event.value !== "" && event.key === "Enter") {
    const div = event.target.parentNode;
    const h4 = document.createElement("h4");
    h4.addEventListener("dblclick", handleEditGreeting);
    h4.innerHTML = event.target.value;
    saveName(event.target.value);
    div.replaceChild(h4, event.target);
  } else if (event.key === "Escape") {
    const div = event.target.parentNode;
    const h4 = document.createElement("h4");
    h4.innerHTML = event.target.name;
    h4.addEventListener("dblclick", handleEditGreeting);
    div.replaceChild(h4, event.target);
  }
};

const handleEditGreeting = (event) => {
  const div = event.target.parentNode;
  const input = document.createElement("input");

  input.value = event.target.innerHTML;
  input.name = event.target.innerHTML;
  input.addEventListener("keyup", handleSubmitNewGreeting);
  div.replaceChild(input, event.target);
};

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.parentNode.classList.add(SHOWING_CN);
  todoList.classList.add(SHOWING_CN);
  clock.classList.add(SHOWING_CN);
  footer.classList.add(SHOWING_CN);

  greeting.innerHTML = text;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
greeting.addEventListener("dblclick", handleEditGreeting);
