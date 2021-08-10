/*add-member*/
let members = {},
  memberIndex = 0,
  deleteButtons = {};
const membersBlock = document.getElementById("membersBlock"),
  generateButton = document.getElementById("generateButton");

/*temp-function start*/
function temp() {
  console.log("it works!");
}
/*temp-function end*/

function buttonClassToggle(button, condition) {
  if (Object.keys(members).length === 0 && members.constructor === Object) {
    button.classList.toggle("blockedButton");
    button.classList.toggle("commonButton");
    button.disabled = condition;
    console.log(button.disabled, condition);
  }
}

function addMember() {
  buttonClassToggle(generateButton, false);
  members[memberIndex] = {
    index: memberIndex,
    name: document.getElementById("memberName").value,
    initiative: document.getElementById("memberInitiative").value,
  };

  membersBlock.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="grid grid-cols-2 items-center mx-auto my-2 member">
      <div class="flex">
        <p>${document.getElementById("memberName").value}</p>
        <span class="mx-2">—</span>
        <p>${document.getElementById("memberInitiative").value}</p>
      </div>
      <button
        id="deleteButton"
        class="text-red-700 deleteButton"
        type="button"
      >
        X
      </button>
    </div>
  `
  );

  deleteButtons[memberIndex] = {
    index: memberIndex,
    deleteButton: document.getElementById("deleteButton"),
  };
  memberIndex++;

  /*delete-member*/
  Object.keys(deleteButtons).forEach((key) => [
    deleteButtons[key].deleteButton.addEventListener("click", function () {
      deleteButtons[key].deleteButton.parentNode.parentNode.removeChild(
        deleteButtons[key].deleteButton.parentNode
      );
      delete deleteButtons[key];
      delete members[key];
      buttonClassToggle(generateButton, true);
    }),
  ]);
}

/*checkbox*/
const checkBoxes = [...document.getElementsByClassName("checkbox")];

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", function () {
    checkBox.parentNode.classList.toggle("deadMember");
  });
});
