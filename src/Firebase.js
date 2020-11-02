import * as firebase from 'firebase/app'


var config = {
    apiKey: "AIzaSyAzps9xa5TguO-kVHnDMlUOc6J5AXo6iDg",
    authDomain: "inception-2ceaf.firebaseapp.com",
    databaseURL: "https://inception-2ceaf.firebaseio.com",
    projectId: "inception-2ceaf",
    storageBucket: "inception-2ceaf.appspot.com",
    messagingSenderId: "786687364561",
    appId: "1:786687364561:web:dc240db7c472caec39a4f0",
    measurementId: "G-5HT6W6N664"
}
firebase.default.initializeApp(config)

export default firebase