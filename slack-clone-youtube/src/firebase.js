import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4d1JqWdUQ4aZrAXeTKRJ0gYuOLvjH658",
    authDomain: "slack-clone-45273.firebaseapp.com",
    projectId: "slack-clone-45273",
    storageBucket: "slack-clone-45273.appspot.com",
    messagingSenderId: "127618352930",
    appId: "1:127618352930:web:acad2f143491db61f7c77b",
    measurementId: "G-LNXJZBPCQP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}

    // firebase를 설치 했지만 계속해서 module을 풀 수 없다고 나온다...
    // 최신 버전 9가 설치 되어 있었음. 
    // firebase 9 버전은 아예 문법과 라이브러리 구성이 다른 것 같다. 
    // npm install firebase@8.1.0으로 문제 해결