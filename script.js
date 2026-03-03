import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const visitorBox = document.getElementById("visitorBox");
const chatBox = document.getElementById("chatBox");
const authError = document.getElementById("authError");


// ✅ LOGIN / SIGNUP
window.saveVisitor = async function () {
  const email = document.getElementById("emailInput")?.value.trim();
  const password = document.getElementById("passwordInput")?.value.trim();

  if (!email || !password) {
    authError.textContent = "Please enter email & password";
    return;
  }

  try {
    // First try login
    await signInWithEmailAndPassword(auth, email, password);
    authError.textContent = "";
  } catch (error) {

    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-credential"
    ) {
      // If account not found → create new account
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        authError.textContent = "";
      } catch (signupError) {
        authError.textContent = signupError.message;
      }
    }

    else if (error.code === "auth/wrong-password") {
      authError.textContent = "Wrong password ❌";
    }

    else {
      authError.textContent = error.message;
    }
  }
};


// ✅ Auto Login Check
onAuthStateChanged(auth, (user) => {
  if (user) {
    visitorBox.style.display = "none";
    chatBox.style.display = "block";
    loadThoughts();
  } else {
    visitorBox.style.display = "block";
    chatBox.style.display = "none";
  }
});


// ✅ Logout
window.logout = async function () {
  await signOut(auth);
};


// ✅ Save Thought
document.getElementById("saveBtn").addEventListener("click", async () => {
  const text = document.getElementById("shayariInput").value.trim();
  if (!text) return;

  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "thoughts"), {
    uid: user.uid,
    text: text,
    createdAt: new Date()
  });

  document.getElementById("shayariInput").value = "";
  loadThoughts();
});


// ✅ Load Thoughts
async function loadThoughts() {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "thoughts"),
    where("uid", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);

  const shayariList = document.getElementById("shayariList");
  shayariList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const div = document.createElement("div");
    div.textContent = doc.data().text;
    shayariList.appendChild(div);
  });
}


// ✅ Music
window.playMusic = function () {
  const music = document.getElementById("musicSelect").value;
  const player = document.getElementById("player");

  if (music) {
    player.src = music;
    player.play();
  }
};