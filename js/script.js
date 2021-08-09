/*add-member*/
const members = [];
const deleteButtons = [];
const membersBlock = document.getElementById("membersBlock");

function addMember() {
  members.push(
    document.getElementById("memberName").value +
      "&" +
      document.getElementById("memberInitiative").value
  );
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
        class="text-red-700 deleteButton" type="button"
      >
        X
      </button>
    </div>
  `
  );

  /*delete-member*/
  deleteButtons.push(document.getElementById("deleteButton"));
  deleteButtons.forEach((deleteButton, index) => [
    deleteButton.addEventListener("click", function () {
      deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
      console.log("index: ", index);
      deleteButtons.splice(index, 1);
      members.splice(index, 1);
      console.log(members);
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
