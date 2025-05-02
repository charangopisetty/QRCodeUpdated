// Import Firebase configuration
import firebaseConfig from './config.js';

// Initialize Firebase (using the modular SDK style)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to handle form submission and send data to Firebase
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const marketingConsent = document.getElementById('marketingConsent').checked;
    const timestamp = new Date().toISOString();

    // Create an object to store the data
    const contactData = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        marketingConsent: marketingConsent,
        timestamp: timestamp
    };

    // Send the data to Firebase Realtime Database
    sendDataToFirebase(contactData);
});

// Function to send data to Firebase Realtime Database
function sendDataToFirebase(contactData) {
    const contactRef = ref(database, 'contacts'); // 'contacts' is your database path
    push(contactRef, contactData)
        .then(() => {
            alert("Your message has been sent successfully!");
            // Optionally clear the form after successful submission
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error("Error sending data to Firebase:", error);
            alert("There was an error. Please try again.");
        });
}
  