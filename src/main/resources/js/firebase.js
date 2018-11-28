import firebase from 'firebase'

const DB_CONFIG = {
    apiKey: "AIzaSyB8fWA0dMCz8VWRl8maqlFA7G7CQTMnUf4",
    authDomain: "todo-app-c90cc.firebaseapp.com",
    databaseURL: "https://todo-app-c90cc.firebaseio.com",
    projectId: "todo-app-c90cc",
    storageBucket: "todo-app-c90cc.appspot.com",
    messagingSenderId: "20602849315"
};
firebase.initializeApp(DB_CONFIG);
export default firebase;