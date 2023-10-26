import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-5e62b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "listItems");

const listItemsEl = document.querySelector("#list-items");
const addBtnEl = document.querySelector("#add-btn");
const inputFieldEl = document.querySelector("#input-field");

addBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(listInDB, inputValue);
    clearInput();
    updateList(inputValue);
})

function clearInput() {
    inputFieldEl.value = "";
}
function updateList(input) {
    listItemsEl.innerHTML += `<li>${input}</li>`;
}