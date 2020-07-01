var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lazycookingrecipies');
//mongoose.connect('mongodb://localhost:3000/lazycookingrecipies');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));

db.once('open', function(callback) {
    console.log("connection succeeded");
})


var add = express()


add.use(bodyParser.json());
add.use(express.static('public'));
add.use(bodyParser.urlencoded({
    extended: true
}));

add.post('/Login/signin', function(req, res) {
    var Username = req.body.Username;
    var Password = req.body.Password;
    

    var data = {
        "Username": Username,
        "Password": Password
       
    }
    db.collection('login').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    //return res.redirect('/Login/signin.html');
	return res.redirect('index.html');
})


add.get('/', function(req, res) {
//add.get('/Login/index.html', function(req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/Login/signin.html');
}).listen(3000)


console.log("server listening at port 3000");