import { app } from "./Firebase Config.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInAnonymously,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

//使用createUserWithEmailAndPassword方法允許使用者使用E-Mail註冊app
function EmailSignUp(emailId, emailPassword) {
    createUserWithEmailAndPassword(auth, emailId, emailPassword)
        .then((userCredential) => {
            console.log(userCredential.user);//userCredential參數可以取得註冊成功後的用戶憑證資訊
        }).catch((err) => {
            console.log(`${err.code}:${err.message}`);
        });
}

//使用signInWithEmailAndPassword方法允許使用者透過已註冊的E-Mail登入app
function EmailSignIn(emailId, emailPassword) {
    signInWithEmailAndPassword(auth, emailId, emailPassword)
        .then((userCredential) => { console.log(userCredential.user) })//登入成功後userCredential可以取得用戶憑證資訊
        .catch((err) => { console.log(err.message) });
}

//使用signInAnonymously方法匿名登入
function AnonySignIn() {
    signInAnonymously(auth)
        .then(() => console.log('匿名登入成功'))
        .catch((err) => { console.log(err.message); })
}

