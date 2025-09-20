// src/firebase/uploadChatResponse.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const uploadChatResponse = async (uid, userInput, botResponse) => {
  try {
    await addDoc(collection(db, "chat_responses"), {
      uid: uid || "guest",
      userInput,
      botResponse,
      createdAt: serverTimestamp(),
    });
    console.log("Chat saved in Firestore ✅");
  } catch (error) {
    console.error("Error saving chat:", error);
  }
};
