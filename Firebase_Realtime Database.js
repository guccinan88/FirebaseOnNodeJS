import {app}from "./Firebase Config.js"//引入Firebase初始化組態
import {getDatabase,ref,set,onValue,push,update,child, remove} from "firebase/database";
// 執行初始化 Firebase
const db=getDatabase(app);

//.info/connected會依據連線狀態，回傳一個bool值
let connectedRef=ref(db,".info/connected");
onValue(connectedRef,(snap)=>{
    if(snap.val()===true){
        console.log('已連線!');
    }else{
        console.log('未連線!');
    }
});

//寫入資料，如果資料不存在會產生一個新的文件標題
function writeData(){
    set(ref(db,'users/new'),{
        name:"nan-nan-Li",
        current_book:"CookBook"
    });
}

//讀取資料，分為各別取得資料標題、內容及整組資料
function readData(){
    const startCountRef=ref(db,'users/');
    onValue(startCountRef,(snapshot)=>{
    snapshot.forEach((data)=>{
        console.log(data.key);//取得資料列表標題
        console.log(data.val());//取得資料內容
    })
    console.log(snapshot.val());//取得全部資料
    });
}
readData();

function updateData(){
    const postData={
        name:"nan-nan",
        current_book:"Angular"
    }
    const newPostKey=push(child(ref(db),'/users')).key;
    const updates={};
    updates[`/users/${newPostKey}`]=postData;
    update(ref(db),updates).then(()=>console.log("資料修改成功")).catch((err)=>console.log(err));
}
updateData();
//刪除資料
function removeData(){
    remove(ref(db,"/users/-NCxYku41fyW0M-Wwozl"))
    .then(()=>console.log("刪除成功"))
    .catch((err)=>console.log("刪除失敗"));
}
removeData();