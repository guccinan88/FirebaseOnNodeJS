//引入createRequire並命名require變數是為了在module環境使用require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-cookbook-97c26-default-rtdb.firebaseio.com"
});
//建立使用者，建立成功會出現使用者資訊
function createUser(email, password, name) {
    admin.auth().createUser({
        email: email,
        password: password,
        displayName: name
    }).then((reg) => {
        console.log('註冊成功:', reg);
    }).catch((err) => {
        console.log('註冊失敗:', err);
    });
}
//透過E-Mail帳號取得使用者資訊
function getUser(email) {
    admin.auth().getUserByEmail(email)
        .then((user) => { console.log(user) })
        .catch((err) => { console.log(err) });
}

//取得所有使用者資訊
function getAllUsers() {
    admin.auth().listUsers()
        //admin.auth().listUsers(10)  listUsers加入數目可限制搜尋筆數，目前為10筆
        .then((users) => console.log(users))
        .catch((err) => console.log('取得所有使用者發生錯誤:', err));
}

//更新使用者資訊
function updateUser(email) {
    admin.auth().getUserByEmail(email) //目前尚未知道如何直接取得uid的方法，所以藉由email間接取得
        .then((user) => {
            admin.auth().updateUser(user.uid, { //user.uid是藉由email所取得的
                displayName: 'Joe' //將使用者顯示名稱更改為Joe
            });
        }).catch((err) => {
            console.log('使用者資訊更新錯誤:', err);
        });
}

//刪除使用者資訊
function deleteUser(email) {
    admin.auth().getUserByEmail(email) //目前尚未知道如何直接取得uid的方法，所以藉由email間接取得
        .then((user) => {
            admin.auth().deleteUser(user.uid);
            console.log('刪除成功!');
        }).catch((err) => {
            console.log('刪除失敗:', err);
        });
}

//刪除多位使用者
function deleteUsers() {
    //let usersArr = ['e1@gmail.com', 'e2@gmail.com'];也可使用陣列儲存要刪除的email
    let setUsers = new Set();//使用Set的好處是內容的元素有不能重複的特性，可以避免相同uid重複操作的錯誤!
    
    setUsers.add('e1@gmail.com');
    setUsers.add('e2@gmail.com');
    setUsers.forEach((user) => {
        admin.auth().getUserByEmail(user).then((user) => {
            admin.auth().deleteUser(user.uid);
            console.log('刪除成功!');
        }).catch((err) => {
            console.log('刪除失敗:', err);
        });
    });
}
deleteUsers();


