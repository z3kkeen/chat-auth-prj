// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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

// Auth
//========================================

// Set variable with Bootstrap
const loginModal = new bootstrap.Modal('#login-modal');
loginModal.show();


// Listen for click on login button
document.querySelector("#logMeInBtn").addEventListener("click", function() {
   
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const auth = getAuth();

// Sign in with Firebase
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed in 
    const user = userCredential.user;

    // Hide modal
    loginModal.hide();

    // Call function to init database
    initDatabase()
  })
  .catch((error) => {
    console.log(error);
  });
});


//Database
//==============================================
const db = getDatabase(app);

// initializes Realtime Database and get a reference service
function initDatabase() {

// create reference, where in the database we want to take info from
const chatRef = ref(db, '/chat');


// listens for database changes
onChildAdded(chatRef, function (data) {

    // create element and append to list element
    const list = document.querySelector("ul")
    const message = document.createElement("li")

    message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

    list.appendChild(message)
});
}

// New message
const input = document.querySelector("input");

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