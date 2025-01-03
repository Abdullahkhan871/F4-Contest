let form = document.querySelector("form");
let userInputs = document.querySelectorAll("form input");

form.addEventListener("submit", handleUserData);

let arrayOfStudents = [];
let count = 0;

function handleUserData(e) {
  e.preventDefault();
  let userData = {};
  userData["ID"] = ++count;
  userInputs.forEach((item) => {
    if (item.value != "") {
      userData[item.name] = item.value;
    } else {
      item.style.border = "1px solid red";
    }
    item.value = "";
  });
  arrayOfStudents.push(userData);
}

userInputs.forEach((item) => {
  item.addEventListener("input", () => {
    if (item.value != "") {
      item.style.border = "1px solid #fff";
    }
  });
});
