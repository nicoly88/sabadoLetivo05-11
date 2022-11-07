import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBbvMDkKV0I_gtmR8NXzYX9aFJSAc0CPEk",
  authDomain: "aula07-10.firebaseapp.com",
  projectId: "aula07-10",
  storageBucket: "aula07-10.appspot.com",
  messagingSenderId: "908071016267",
  appId: "1:908071016267:web:e09d06777c904e538bbace",
  measurementId: "G-FXWYLV3R6R"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};
