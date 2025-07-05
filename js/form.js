import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
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

const dropdownInput = document.getElementById("dropdownInput");
const dropdownList = document.getElementById("dropdownList");

let agentList = [];

// Ambil data dari UTILS/AGENT
get(child(ref(db), "UTILS/AGENT"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      agentList = Object.values(snapshot.val());
      populateDropdown(agentList);
    }
  })
  .catch((error) => {
    console.error("Gagal ambil data:", error);
  });

function populateDropdown(items) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("dropdown-item");
    div.textContent = item;
    div.onclick = () => {
      dropdownInput.value = item;
      dropdownList.style.display = "none";
    };
    dropdownList.appendChild(div);
  });
}

dropdownInput.addEventListener("click", () => {
  dropdownList.style.display =
    dropdownList.style.display === "block" ? "none" : "block";
});

// Tutup dropdown kalau klik di luar
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container")) {
    dropdownList.style.display = "none";
  }
});

function formatTanggal(tanggalInput) {
  const tanggal = new Date(tanggalInput);
  return tanggal.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const form = document.getElementById("regForm");
const checkbox = document.getElementById("konfirmasi");
async function getNextId() {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "FORM SURVEI"));

  if (snapshot.exists()) {
    const data = snapshot.val();
    const ids = Object.keys(data).map(Number);
    const maxId = Math.max(...ids);
    return maxId + 1;
  } else {
    return 1;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const formVal = document.getElementById("regForm");
  formVal.addEventListener("submit", async (e) => {
    e.preventDefault();
    const requiredInput = formVal.querySelectorAll("input[required");
    const tanggalValue = document.getElementById("tanggal").value;
    const formatted = formatTanggal(tanggalValue);

    let valid = true;
    requiredInput.forEach((inp) => {
      if (inp.value.trim()) {
        valid.false;
        inp.classList.add("error");
      } else {
        inp.classList.remove("error");
      }
    });
    if (!checkbox.checked) {
      valid = false;
      alert("Centang persetujuan terlebih dahulu.");
    }
    if (dropdownInput.value === "Agency") {
      valid = false;
      alert("Silakan pilih Agency.");
    }

    if (!valid) return;

    const nextId = await getNextId();

    const data = {
      id: nextId,
      name: form.nama?.value || document.getElementById("nama").value,
      date: formatted,
      time: document.getElementById("jam").value,
      project: "Harmoni Horizon Valley",
      notelp: document.getElementById("telepon").value,
      domi: document.getElementById("domisili").value,
      agent: dropdownInput.value,
      market: document.getElementById("marketing").value,
    };
    try {
      await set(ref(db, "FORM SURVEI/" + nextId), data);
      alert("✅ Data berhasil dikirim!");
      form.reset();
      dropdownInput.value = "Agency";
      setTimeout(() => {
        window.location.href = "Utils/loading.html";
      }, 500);
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data.");
    }
  });
});
