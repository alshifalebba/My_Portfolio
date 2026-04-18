import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPJX3MyMWtthCvwRzfhNlGAYQE6Y4Pm28",
  authDomain: "portfolio-c7caa.firebaseapp.com",
  projectId: "portfolio-c7caa",
  storageBucket: "portfolio-c7caa.firebasestorage.app",
  messagingSenderId: "440879583810",
  appId: "1:440879583810:web:8c5f1b36728f7e8d7bd3db",
  measurementId: "G-X164CR5R3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase connected successfully");
