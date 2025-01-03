let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let userInputs = document.querySelectorAll("form input");

form.addEventListener("submit", handleUserData);

let arrayOfStudents = [];
let count = 0;

function handleUserData(e) {
  e.preventDefault();
  let emptyInput = false;
  let userData = {};
  userData["ID"] = ++count;
  userInputs.forEach((item) => {
    if (item.value != "") {
      userData[item.name] = item.value;
    } else {
      item.style.border = "1px solid red";
      emptyInput = true;
    }
    item.value = "";
  });

  if (emptyInput) return;
  arrayOfStudents.push(userData);
  addTableRow(userData);
}

function addTableRow(userData) {
  let tr = document.createElement("tr");
  for (const element in userData) {
    let td = document.createElement("td");
    td.innerHTML = userData[element];
    tr.append(td);
  }
  tbody.append(tr);
}

// when user Input not empty
userInputs.forEach((item) => {
  item.addEventListener("input", () => {
    if (item.value != "") {
      item.style.border = "1px solid #fff";
    }
  });
});
