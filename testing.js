var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service")
app.use(express.static('public'));


app.get("/char",(req,res)=>{
    data.getAllEmployees.then((data)=>{
        res.json(data);
    });
});