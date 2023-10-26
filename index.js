import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
})

onValue(listInDB, function(snapshot) {
    if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())
    console.log(snapshot.val())
    clearListEl()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemValue = currentItem[1]
        let currentItemId = currentItem[0]
        updateList(currentItem)
    }
    } else {
        listItemsEl.innerHTML = "no items here yet..."
    }
})

function clearListEl() {
    listItemsEl.innerHTML = ""
}

function clearInput() {
    inputFieldEl.value = "";
}
function updateList(input) {
    let itemId = input[0]
    let itemValue = input[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `listItems/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    listItemsEl.append(newEl)
}
