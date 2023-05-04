const button = document.querySelector(".line button");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const groups = Array.from(document.querySelectorAll(".group"));

button.addEventListener("click", handleClick);

function handleClick() {
  let isValid = false;
  if (!day.value || !month.value || !year.value) {
    return checkEmptyDate();
  }
  clearErrors();
  isValid = validateDate();

  if (!isValid) {
    return;
  }

  const age = calculateAge();
  document.querySelector("p.years span").textContent = age.y;
  document.querySelector("p.months span").textContent = age.m;
  document.querySelector("p.days span").textContent = age.d;
}

function validateDate() {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (
    year.value % 400 === 0 ||
    (year.value % 100 !== 0 && year.value % 4 === 0)
  ) {
    daysInMonth[1] = 29;
  }

  for (let i = 0; i < groups.length; i++) {
    if (
      day.value < 1 ||
      !daysInMonth[month.value - 1] ||
      day.value > daysInMonth[month.value - 1]
    ) {
      wrongDateChecker(groups[0], "a valid day");
    }
    if (month.value < 1 || month.value > 12) {
      wrongDateChecker(groups[1], "a valid month");
    }
    if (year.value > new Date().getFullYear()) {
      wrongDateChecker(groups[2], "in the past");
    }
  }

  if (groups.some((group) => group.classList.contains("error"))) {
    return false;
  }
  return true;
}

function checkEmptyDate() {
  groups.forEach((group) => {
    group.classList.add("error");
    const p = document.createElement("p");
    p.className = "error-message";
    p.textContent = "This field is required";
    group.appendChild(p);
  });
}

function clearErrors() {
  groups.forEach((group) => {
    group.classList.remove("error");
    const p = group.querySelector("p");
    if (p) {
      group.removeChild(p);
    }
  });
}

function wrongDateChecker(data, text) {
  if (data.classList.contains("error")) {
    return;
  }
  data.classList.add("error");
  const p = document.createElement("p");
  p.className = "error-message";
  p.textContent = "Must be " + text;
  data.appendChild(p);
}

function calculateAge() {
  const today = new Date();
  let y = today.getFullYear() - Number(year.value);
  let m = today.getMonth() + 1 - Number(month.value);
  if (m < 0 || (m === 0 && today.getDate() < Number(day.value))) {
    y--;
    m += 12;
  }
  let d = today.getDate() - Number(day.value);
  if (d < 0) {
    m--;
    d += 31;
  }
  if (m < 0) {
    m = 11;
    y--;
  }
  return {
    y,
    m,
    d,
  };
}
