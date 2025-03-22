import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAxZQQya6AuwLAVz6PPTn4xOXrNc4uzyc4",
  authDomain: "reactlinks-ce209.firebaseapp.com",
  projectId: "reactlinks-ce209",
  storageBucket: "reactlinks-ce209.firebasestorage.app",
  messagingSenderId: "389445036778",
  appId: "1:389445036778:web:b1d12048ddcd7430850593"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db}