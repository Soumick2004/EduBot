import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import app from "./config";
import { auth } from "./auth";

const db = getFirestore(app);

export const uploadChatResponse = async (userInput, botResponse) => {
  try {
    const uid = auth.currentUser ? auth.currentUser.uid : "guest";

    await addDoc(collection(db, "chatResponses"), {
      uid,
      userInput,
      botResponse,
      createdAt: serverTimestamp()
    });

    console.log("✅ Chat saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving chat:", error);
  }
};