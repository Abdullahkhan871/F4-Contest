let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let userInputs = document.querySelectorAll("form input");
let deleteRow = null;
form.addEventListener("submit", handleUserData);

let arrayOfStudents = [];
let count = 0;

function handleUserData(e) {
  e.preventDefault();

  let emptyInput = false;
  let userData = {};
  userData["id"] = ++count;
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

// when user Input not empty
userInputs.forEach((item) => {
  item.addEventListener("input", () => {
    if (item.value != "") {
      item.style.border = "1px solid #fff";
    }
  });
});

// adding row and td
function addTableRow(userData) {
  let tr = document.createElement("tr");
  for (const element in userData) {
    let td = document.createElement("td");
    if (element != "degree") {
      td.innerHTML = userData[element];
    } else {
      td.innerHTML = userData[element];
      td.className = "editSetting";
      const trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash delete";
      const editIcon = document.createElement("i");
      editIcon.className = "fa-solid fa-pen-to-square edite";
      td.append(trashIcon, editIcon);
    }
    tr.append(td);
  }
  tbody.append(tr);
}

// searching
let search = document.querySelector("#search");
search.addEventListener("input", handleSearch);

function handleSearch(e) {
  let text = e.target.value;
  let searchUser = arrayOfStudents.filter((item) => {
    if (
      item.name.toLowerCase().includes(text) ||
      item.email.toLowerCase().includes(text) ||
      item.degree.toLowerCase().includes(text)
    ) {
      return item;
    }
  });
  tbody.innerHTML = "";
  searchUser.forEach((item) => addTableRow(item));
}

// delete Feature
// should remove from array and table

tbody.addEventListener("click", handleDelegation);

function handleDelegation(e) {
  let element = e.target;

  if (element.classList.contains("delete")) {
    handleDeleteRow(element);
  } else if (element.classList.contains("edite")) {
    console.log(element);
  }
}

function handleDeleteRow(element) {
  let idCheckToRemove =
    element.parentElement.parentElement.firstChild.innerHTML;

  arrayOfStudents = arrayOfStudents.filter(
    (item) => item.id !== idCheckToRemove
  );
  element.parentElement.parentElement.remove();
}
