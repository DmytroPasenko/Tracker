/*add-member*/
let members = {},
  memberIndex = 0,
  deleteButtons = {};
const membersBlock = document.getElementById("membersBlock");

function addMember() {
  // members.push(
  //   document.getElementById("memberName").value +
  //     "&" +
  //     document.getElementById("memberInitiative").value
  // );

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
  // console.log(members);
  // console.log(deleteButtons);

  /*delete-member*/
  Object.keys(deleteButtons).forEach((key) => [
    deleteButtons[key].deleteButton.addEventListener("click", function () {
      deleteButtons[key].deleteButton.parentNode.parentNode.removeChild(
        deleteButtons[key].deleteButton.parentNode
      );
      delete deleteButtons[key];
      delete members[key];
      console.log(key, "deleted");
      console.log("members", members);
      console.log(deleteButtons);
    }),
    // deleteButton.addEventListener("click", function () {
    //   console.log("deleted");
    // }),
  ]);

  // deleteButtons.forEach((deleteButton, index) => [
  //   deleteButton.addEventListener("click", function () {
  //     deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
  //     // console.log("index: ", index, "; member del");
  //     // deleteButtons.splice(index, 1);
  //     console.log(members[index], " deleted");
  //     delete members[index];
  //     console.log(members);
  //     // deleteButtons.forEach((_deleteButton, index) => {
  //     //   // console.log("index: ", index, "; member del");
  //     //   // deleteButtons.splice(index, 1);
  //     //   // members.splice(index, 1);
  //     //   // console.log(members);
  //     // });
  //   }),
  // ]);
}

/*checkbox*/
const checkBoxes = [...document.getElementsByClassName("checkbox")];

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", function () {
    checkBox.parentNode.classList.toggle("deadMember");
  });
});
