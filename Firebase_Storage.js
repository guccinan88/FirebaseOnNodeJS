import{getStorage,ref as refStorage,uploadBytes}from "firebase/storage";
import { app } from "./Firebase Config.js";//引入Firebase初始化組態

const storage=getStorage(app);
const storageRef=refStorage(storage,'img');
let file='img/jay.png';
const metadata={
    contentType:'image/png'
}
uploadBytes(storageRef,file,metadata);