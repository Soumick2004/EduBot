import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./config";

const storage = getStorage(app);

// Upload file to Firebase Storage
export const uploadFile = async (uid, file) => {
  const fileRef = ref(storage, `chatbot/${uid}/${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export { storage };
