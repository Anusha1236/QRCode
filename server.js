const express = require('express');
const app = express();
const QRcode = require('qrcode');
const ejs = require('ejs');
const bp = require('body-parser')
const port = 3000;  
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render("index");
})

app.post('/scanQRCode',(req,res)=>{
    const url  = req.body.url;
    console.log(req.body.url);
    if(url.length == 0) res.send("please enter some url");
    QRcode.toDataURL(url,(err,data)=>{
        if(err) res.send("error occured");
        console.log(data);
        res.render("QRScan",{data})
    })
})

app.listen(port,(req,res)=>{
    console.log(`server is listening in the port ${port}`);
})
