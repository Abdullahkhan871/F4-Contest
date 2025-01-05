let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let userInputs = document.querySelectorAll("form input");
let addBtn = document.querySelector("#addBtn");

let elem = null;
let deleteRow = null;
let arrayOfStudents = [];
let count = 0;

form.addEventListener("submit", handleUserData);

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
  addBtn.innerText = "Add Student";
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
    handleEditRow(element);
  }
}

function handleDeleteRow(element) {
  let idCheckToRemove = parseInt(
    element.parentElement.parentElement.firstChild.innerHTML
  );

  arrayOfStudents = arrayOfStudents.filter(
    (item) => item.id !== idCheckToRemove
  );
  element.parentElement.parentElement.remove();
}

function handleEditRow(element) {
  elem = element.parentElement.parentElement.childNodes;
  userInputs.forEach((item, index) => (item.value = elem[index + 1].innerText));

  addBtn.innerText = "edit student";

  // addBtn.addEventListener("click", (e) =>
  //   acceptEditOfRow(e, elem, element.parentElement.parentElement)
  // );
  //   addBtn.removeEventListener("click", acceptEditOfRow);
}

function acceptEditOfRow(e, elem, currentRow) {
  e.preventDefault();

  addBtn.innerText = "Add Student";
 
  let ele = Array.from(userInputs).map((item) => item.value);

  console.log(ele);
  
  currentRow.innerHTML = `
      <td>${elem[0].innerText}</td>
      <td>${ele[0]}</td>
      <td>${ele[1]}</td>
      <td>${ele[2]}</td>
      <td>${ele[3]}</td>
      <td class="editSetting">
      ${ele[4]}
      <i class="fa-solid fa-trash delete"></i>
      <i class="fa-solid fa-pen-to-square edite"></i>
      </td>
    `;
  userInputs.forEach((input) => (input.value = ""));
}



// GPT Code 

// function handleEditRow(element) {
//   // Select the row to be edited
//   elem = element.parentElement.parentElement.childNodes;

//   // Fill the input fields with the current row data
//   userInputs.forEach((item, index) => (item.value = elem[index + 1].innerText));

//   // Change the button text to indicate editing mode
//   addBtn.innerText = "Save Changes";

//   // Temporarily add an event listener for the editing functionality
//   const saveEditListener = (e) =>
//     acceptEditOfRow(e, elem, element.parentElement.parentElement);

//   addBtn.addEventListener("click", saveEditListener);

//   // After saving changes, remove the listener to restore the button to "Add" mode
//   const resetButton = () => {
//     addBtn.innerText = "Add Student";
//     addBtn.removeEventListener("click", saveEditListener);
//   };

//   addBtn.addEventListener("click", resetButton);
// }

// function acceptEditOfRow(e, elem, currentRow) {
//   e.preventDefault();

//   // Collect updated values from input fields
//   let updatedValues = Array.from(userInputs).map((item) => item.value);

//   // Update the row's innerHTML with the new data
//   currentRow.innerHTML = `
//       <td>${elem[0].innerText}</td>
//       <td>${updatedValues[0]}</td>
//       <td>${updatedValues[1]}</td>
//       <td>${updatedValues[2]}</td>
//       <td>${updatedValues[3]}</td>
//       <td class="editSetting">
//       ${updatedValues[4]}
//       <i class="fa-solid fa-trash delete"></i>
//       <i class="fa-solid fa-pen-to-square edite"></i>
//       </td>
//     `;

//   // Clear the input fields
//   userInputs.forEach((input) => (input.value = ""));
// }
