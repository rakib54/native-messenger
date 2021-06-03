import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8-qt_0pAFiBw9WM8YrgYnGih6HZJcShg",
  authDomain: "native-chat-app-d9650.firebaseapp.com",
  projectId: "native-chat-app-d9650",
  storageBucket: "native-chat-app-d9650.appspot.com",
  messagingSenderId: "25701592506",
  appId: "1:25701592506:web:ea4933a0f6ba2af2098183"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const db = app.firestore()
const auth = firebase.auth()

export {db, auth}
