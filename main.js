// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLs0S0q-AKRxBVrj3UPY35cOGe7Abbw74",
    authDomain: "chat-4d75a.firebaseapp.com",
    projectId: "chat-4d75a",
    storageBucket: "chat-4d75a.appspot.com",
    messagingSenderId: "93662882605",
    appId: "1:93662882605:web:8ac7315948b3cc458841a4",
    databaseURL: "https://chat-4d75a-default-rtdb.europe-west1.firebasedatabase.app"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializes Realtime Database and get a reference service
const db = getDatabase(app);

// create reference, where in the database we want to take info from
const chatRef = ref(db, '/chat');


// listens for database changes
onChildAdded(chatRef, function (data) {

    // create element and append to list element
    const message = document.createElement("li")
    message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

    list.appendChild(message)
})

const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})