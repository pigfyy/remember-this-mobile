import { db } from "./firebaseConfig";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

async function getImageBlob(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

const uploadImage = async (userId, imageUri) => {
  console.log("yo");
  console.log("yo2");
  await uploadImageToCloudStorage(userId, imageUri);
};

async function uploadImageToCloudStorage(userId, imageUri) {
  const blob = await getImageBlob(imageUri);
  const fileName = `${userId}/userID_${userId}_${uuidv4()}.jpg`;
  const storageRef = storage().ref("black-t-shirt-sm.png");

  await storageRef.putFile(imageUri);
}
// async function addDocument() {
//   const docRef = doc(db, `test/${uuidv4()}`);
//   console.log("fuck");
//   await setDoc(docRef, { id: uuidv4() });
// }

export { uploadImage };
