/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Marc Nicolas Oliva Student ID: 130943202 Date: 06-11-2021
*
* Online (Heroku) Link: https://web322-app-mnicol.herokuapp.com/
*
********************************************************************************/
var path = require("path");
var data = require('./data-service.js');
var express = require('express');
var app = express();
var emp = require('./data/employees.json');//Unnecessary
const { join } = require("path");
app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on PORT: " + HTTP_PORT);
}
//setup a route to listen on the default url path
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
//setup another route to listen in /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});
//setup a route to listen in /employees
app.get("/employees", function(req,res){
    data.getAllEmployees()
    .then((data)=>{
        res.json(data);
    }).catch((err) => {
        res.json("{message: "+err+'}');
        })
});
//setup a route to listen in /managers
app.get("/managers", function(req,res){
    data.getManagers()
    .then((data)=>{
        res.json(data);
    }).catch((err) => {
        res.json("{message: "+err+'}');
    })
});
//setup a route to listen in /departments
app.get("/departments", function(req,res){
    data.getDepartments()
    .then((data)=>{
        res.json(data);
    }).catch((err) => {
        res.json("{message: "+err+'}');
    })
});
//This must be the last call, otherwise the files called after won't execute.
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"/views/404.html"));
});
data.initialize().then(function(){ //before I run my server I initialize the data
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
    console.log("Unable to start server: "+err);
});

