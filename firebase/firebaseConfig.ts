import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDo4FwrUsJZXF5pf-HxNvgpbbs4clti27k",
  authDomain: "mygateclone.firebaseapp.com",
  projectId: "mygateclone",
  storageBucket: "mygateclone.appspot.com",
  messagingSenderId: "675455332087",
  appId: "1:675455332087:web:21938d20b9430682382df2",
  measurementId: "G-J1F2WZXWE9"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getFirestore(app);

export { db, storage };