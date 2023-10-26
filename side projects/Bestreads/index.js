import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://the-pit-69e2f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const booksInDB = ref(database, "books")

const booksEl = document.querySelector("#books")

onValue(booksInDB, function(snapshot) {
    let booksArray = Object.values(snapshot.val())
    clearBooksListEl()
    for (let i = 0; i < snapshot.length; i++) {
        let currentBook = booksArray[i]
        appendBookToBooksListEl(currentBook);
    }
})

function clearBooksListEl() {
    booksEl.innerHTML = ""
}

function appendBookToBooksListEl(bookValue) {
    booksEl.innerHTML += `<li>${bookValue}</li>`
}