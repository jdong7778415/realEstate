import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  appleProvider,
} from "../firebaseConfig";

// Register with email
export async function signUp(email, password, userData) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // Save user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || userData.name || "",
    createdAt: new Date(),
  }, { merge: true });
    // === 新增：写入 localStorage ===
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user.uid,
      userName: user.displayName || user.email || userData.name || "Anonymous"
    })
  );
  // === 新增结束 ===
  return user;
}

// Login with email
export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
  // === 新增：写入 localStorage ===
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user.uid,
      userName: user.displayName || user.email || "Anonymous"
    })
  );
  // === 新增结束 ===
}

// Google login
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    createdAt: new Date(),
  }, { merge: true });
    // === 新增：写入 localStorage ===
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user.uid,
      userName: user.displayName || user.email || "Anonymous"
    })
  );
  // === 新增结束 ===
  return user;
}

// Facebook login
export async function loginWithFacebook() {
  const result = await signInWithPopup(auth, facebookProvider);
  const user = result.user;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    createdAt: new Date(),
  }, { merge: true });
    // === 新增：写入 localStorage ===
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user.uid,
      userName: user.displayName || user.email || "Anonymous"
    })
  );
  // === 新增结束 ===
  return user;
}

// Apple login
export async function loginWithApple() {
  const result = await signInWithPopup(auth, appleProvider);
  const user = result.user;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    createdAt: new Date(),
  }, { merge: true });
    // === 新增：写入 localStorage ===
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user.uid,
      userName: user.displayName || user.email || "Anonymous"
    })
  );
  // === 新增结束 ===
  return user;
}

