importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js")

const firebaseConfig = {
    apiKey: "AIzaSyDz8sD8-Xnx4ARPqN9J6-lJdObXRJZ37jc",
    authDomain: "fir-cookbook-97c26.firebaseapp.com",
    databaseURL: "https://fir-cookbook-97c26-default-rtdb.firebaseio.com",
    projectId: "fir-cookbook-97c26",
    storageBucket: "fir-cookbook-97c26.appspot.com",
    messagingSenderId: "778291213397",
    appId: "1:778291213397:web:479746fd318e51a06610dc",
    measurementId: "G-Z6GJFZ5C9C"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

  
