// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPCLe9fv5GoiVOqNz9wscZfLhiTYtYcKw",
  authDomain: "vue-quiz-2c084.firebaseapp.com",
  projectId: "vue-quiz-2c084",
  storageBucket: "vue-quiz-2c084.appspot.com",
  messagingSenderId: "790463361933",
  appId: "1:790463361933:web:30b8179426d3b4373643c4",
  measurementId: "G-KHC95H42MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db