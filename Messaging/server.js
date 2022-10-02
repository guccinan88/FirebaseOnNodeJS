import express from "express";
import path from "path";
const app=express();
const __dirname=path.resolve();
app.use('/firebase-messaging-sw.js',express.static(path.join(__dirname,'./firebase-messaging-sw.js')));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
}).listen(5566);