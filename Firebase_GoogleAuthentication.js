import express from "express";

const app=express();
app.get('/',(req,res)=>{
    res.send(HTML_CONTENE);
}).listen(5566);

const HTML_CONTENE=`
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
    integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
    crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/435f772d2a.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0/axios.min.js"
        integrity="sha512-26uCxGyoPL1nESYXHQ+KUmm3Maml7MEQNWU8hIt1hJaZa5KQAQ5ehBqK6eydcCOh6YAuZjV3augxu/5tY4fsgQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
</head>

<body>
    <div id="app" class="container">
        <div class="row">
            <div class="col text-center">
                <h3>Firebase Google Authectication</h3>
                <button @click="signInWithGoogleRedirect" class="btn btn-primary">
                    Sign In With Google(重新轉向)
                </button>
                <button @click="signInWithGooglePopup" class="btn btn-success">
                    Sign In With Google(彈出視窗)
                </button>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col text-center" v-if="isSigned">
                <div id="name">{{displayname}}</div>
                <div id="email">{{email}}</div>
                <p class="text-center">
                    <button class="btn btn-danger" data-toggle="modal" data-target="#logout">
                    登出
                    </button>
                </p>
            </div>
        </div>
        <div class="modal" tabindex="-1" role="dialog" id="logout">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{displayname}}</h5>
      </div>
      <div class="modal-body">
        <p>確定登出嗎?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="signOut()">確定</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>
    </div>

    <script>
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

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        new Vue({
            el: '#app',
            data:{
                isSigned:false,
                displayname:'',
                email:''
            },
        mounted(){
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    this.isSigned=true;
                    this.displayname=user.displayName;
                    this.email=user.email
                }
            })
        },
        methods:{
            signInWithGoogleRedirect(){
                const provider=new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithRedirect(provider).then((result)=>{
                    //console.log(result);
                }).catch((err)=>console.log(err));
            },
            signInWithGooglePopup(){
                const provider=new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result)=>{
                    console.log(result);
                }).catch((err)=>console.log(err));
            },
           
            signOut(){
                firebase.auth().signOut().then(()=>{
                    this.isSigned=false;
                    this.displayname='';
                    this.email='';
                    $('#logout').modal('hide');
                }).catch((err)=>console.log(err));
            }
        }
           
        })
    </script>
</body>

</html>
`;