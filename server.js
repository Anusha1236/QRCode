const express = require('express');
const app = express();
const QRcode = require('qrcode');
const ejs = require('ejs');
const bp = require('body-parser')
const port = 3000;  
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("view engine","ejs");


//this get call is needed only when we want to take input from UI
app.get('/',(req,res)=>{
    res.render("index");
    })

//this post call is important for both UI and postman call

app.post('/scanQRCode',(req,res)=>{
    console.log(req.body.url);
    const url  = req.body.url;
    if(url.length == 0) res.send("please enter some url");
    QRcode.toDataURL(url,(err,data)=>{
        if(err) res.send("error occured");
        // console.log(data);
        // res.send(data);
        res.status(201).json({message:data})
        //this render should enable when we want to show qrcode in UI
        // res.render("QRScan",{data})
    })
})

app.listen(port,(req,res)=>{
    console.log(`server is listening in the port ${port}`);
})


//to execute above code in postman
//just needed post call and in that post call we need to give body as an object.in that object we need to give only text which you want to
//convert like qrcode 