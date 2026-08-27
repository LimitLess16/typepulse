import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function saveTypingTest(
  userId: string,
  wpm: number,
  accuracy: number,
  errors: number,
  duration: number
) {
  return addDoc(collection(db, "typingTests"), {
    userId,
    wpm,
    accuracy,
    errors,
    duration,
    createdAt: serverTimestamp(),
  });
}