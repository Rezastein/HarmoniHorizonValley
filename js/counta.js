// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBp-gjRuIgRg4r8hi7BGTNXQYgvkNqVIMQ",
  authDomain: "toolshgi.firebaseapp.com",
  databaseURL: "https://toolshgi-default-rtdb.firebaseio.com",
  projectId: "toolshgi",
  storageBucket: "toolshgi.firebasestorage.app",
  messagingSenderId: "460824198114",
  appId: "1:460824198114:web:85bbf8be227011550317bb",
  measurementId: "G-FCQE589D8K",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

db.ref("SITEPLAN HGI")
  .once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      const bf = parseInt(item.bf) || 0;
      const dp = parseInt(item.dp) || 0;
      const ls = parseInt(item.ls) || 0;
      const jml = parseInt(item.jml) || 0;
      const ttl = bf + dp + ls;
      const ss = jml - ttl;

      document.getElementById("sit-ttl").innerText = ttl;
      document.getElementById("sit-ss").innerText = ss;
    }
  });
