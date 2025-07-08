import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyB3wx-ICJDVQDtsczfKPsSDR-YfgnpCNjU",
  authDomain: "harmonigrupindonesia-cbb95.firebaseapp.com",
  databaseURL:
    "https://harmonigrupindonesia-cbb95-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "harmonigrupindonesia-cbb95",
  storageBucket: "harmonigrupindonesia-cbb95.firebasestorage.app",
  messagingSenderId: "443823197909",
  appId: "1:443823197909:web:509e0875e811070ccf5c5c",
  measurementId: "G-Q6CCD0B6QP",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dbRef = ref(db);

get(child(dbRef, "PROSIT/Harmoni Horizon Valley"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const bf = parseInt(data.bf) || 0;
      const dp = parseInt(data.dp) || 0;
      const ls = parseInt(data.ls) || 0;
      const jml = parseInt(data.jml) || 0;

      const ttl = bf + dp + ls;
      const ss = jml - ttl;

      document.getElementById("sit-ttl").innerText = ttl;
      document.getElementById("sit-ss").innerText = ss;
    } else {
      console.log("Data tidak ditemukan");
    }
  })
  .catch((error) => {
    console.error("Error saat mengambil data:", error);
  });
