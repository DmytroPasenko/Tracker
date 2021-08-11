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
  button.classList.toggle("blockedButton");
  button.classList.toggle("commonButton");
  button.disabled = condition;
}

function addMember() {
  if (Object.keys(members).length === 0 && members.constructor === Object) {
    buttonClassToggle(generateButton, false);
  }
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
      if (Object.keys(members).length === 0 && members.constructor === Object) {
        buttonClassToggle(generateButton, true);
      }
    }),
  ]);
}

/*battle-generation*/
const nextMemberButton = document.getElementById("nextMemberButton"),
  addMemberButton = document.getElementById("addMemberButton"),
  currentMember = document.getElementById("currentMember"),
  trackerTable = document.getElementById("trackerTable"),
  table = document.getElementById("table");
let sortedMembers = {},
  sortedMembersArray = [];

function battleGeneration() {
  buttonClassToggle(nextMemberButton, false);

  Object.keys(members).forEach((key) => {
    sortedMembers[key] = {
      name: members[key].name,
      initiative: members[key].initiative,
    };
  });

  sortedMembersArray = Object.values(sortedMembers).sort(
    (a, b) => a.initiative - b.initiative
  );

  /*filling-up-the-battle-queue*/
  fillingBattle();

  const memberStatusList = document.querySelectorAll(".memberStatusSelector");
  console.log(memberStatusList);

  battlePreparation();
  createAdditionMembers();
}

function fillingBattle() {
  sortedMembersArray.forEach((member) => [
    table.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="grid grid-cols-2 items-center mx-auto my-2">
        <div class="flex normal-case">
          <p>${member.name}</p>
          <span class="mx-2">—</span>
          <p>${member.initiative}</p>
        </div>
        <select
          class="bg-transparent ml-3 memberStatusSelector"
          name="status"
          id="memberStatus"
        >
          <option value="0">Alive</option>
          <option value="1">Unconscious</option>
          <option value="2">Death</option>
        </select>
      </div>
      `
    ),
  ]);
}

function battlePreparation() {
  members = {};
  deleteButtons = {};
  while (membersBlock.hasChildNodes()) {
    membersBlock.removeChild(membersBlock.firstChild);
  }
  if (!membersBlock.hasChildNodes()) {
    membersBlock.insertAdjacentHTML(
      "afterbegin",
      `
      <p class="text-center col-span-2 uppercase mt-2">All members in a battle!</p>
      `
    );
  }
  buttonClassToggle(addMemberButton, true);
  currentMember.innerText =
    sortedMembersArray[sortedMembersArray.length - 1].name;
}

function createAdditionMembers() {
  trackerTable.insertAdjacentHTML(
    "beforeend",
    `
    <div class="flex justify-center mt-4 formSection addMember">
      <input
        id="insMemberName"
        class="bg-transparent text-white nameInput"
        type="text"
        placeholder="Name*"
      />
      <input
        id="insMemberInitiative"
        class="bg-transparent text-white ml-4 initiativeInput"
        type="number"
        placeholder="Initiative*"
      />
      <button
        id="insertMemberButton"
        class="ml-10 uppercase text-white bg-red-700 commonButton"
        type="button"
        onclick="insertMember()"
      >
        Insert member
      </button>
    </div>
    `
  );
}

/*next-member*/
let memberTick = 1;

function nextMember() {
  memberTick != sortedMembersArray.length ? memberTick++ : (memberTick = 1);
  currentMember.innerText =
    sortedMembersArray[sortedMembersArray.length - memberTick].name;
}

/*insert-member*/
function insertMember() {
  const insertingMemberName = document.getElementById("insMemberName"),
    insertingMemberInitiative = document.getElementById("insMemberInitiative");

  sortedMembersArray.push({
    name: insertingMemberName.value,
    initiative: insertingMemberInitiative.value,
  });

  sortedMembersArray = sortedMembersArray.sort(
    (a, b) => a.initiative - b.initiative
  );

  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }

  fillingBattle();
  // memberTick = 1;
  // currentMember.innerText =
  //   sortedMembersArray[sortedMembersArray.length - memberTick].name;
}

/*unconscious-status-for-member*/

/*checkbox*/
const checkBoxes = [...document.getElementsByClassName("checkbox")];

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", function () {
    checkBox.parentNode.classList.toggle("deadMember");
  });
});
