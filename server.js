var path = require("path");
var express = require('express');
var app = express();

var HTTP_PORT = process.env.HTTP_PORT || 8080;

function onStartHTTP(){
    console.log("Express http server listening on PORT: " + HTTP_PORT);
}
//setup a route to listen on the default url path
app.get("/", function(req,res){
    res.send("Hello World <br/><a href='/about.html'> Go to about page</a>");
})
//setup another route to listen in /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
})

app.listen(HTTP_PORT, onStartHTTP);