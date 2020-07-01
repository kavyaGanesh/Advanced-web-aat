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

add.post('/login/signup', function(req, res) {
    var Username = req.body.Username;
	var Email=req.body.Email;
    var Password = req.body.Password;
	var repassword = req.body.repassword;
    

    var data = {
        "Username": Username,
		"Email":Email,
        "Password": Password,
		"repassword": repassword
       
    }
    db.collection('signup').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('/login/signin.html');
	//return res.redirect('index.html');
})
add.get('/login/signin',function(req,res,next){
    return res.render('/login/signin.html');
});
add.post('/login/signin', function(req,res,next){
    db.collection('signup').findOne({Username:req.body.Username},
        function(err,data){
            if(data){
                if(data.Password == req.body.Password){
                   // req.session.userId=data.unique_id;
                    return res.redirect('/index.html');
                }
                else{
                    res.send({"Success":"Wrong password !"});
                }
            }
                else{
                    res.send({"Success":"This user is not registered"});
                }
                }); 
            });
//contact start
add.post('/contact', function(req,res){
    var Username = req.body.Username;
    var Email =req.body.Email;
    var Subject = req.body.Subject;
    var Message =req.body.Message;

    var data = {
        "Username": Username,
        "Email":Email,
        "Subject":Subject,
        "Message":Message
           
    }
    db.collection('contactus').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
           
});
           
return res.redirect('/index.html');
})
//contact end           
 //feedback
add.post('/feedback/index', function(req,res){
	var name = req.body.name;
    var email =req.body.email;
    var experience = req.body.experience;
    var comments = req.body.comments;
  
   
    var data = {
		"name": name,
        "email":email,
        "experience": experience,
        "comments" : comments
        
           
    }
    db.collection('Feedback').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
           
});
           
return res.redirect('/index.html');
})
//feedback end   
//subscribe
add.post('/menu', function(req,res){
	
    var email =req.body.email;
    var experience = req.body.experience;
    var comments = req.body.comments;
  
   
    var data = {
		
        "email":email
        
        
           
    }
    db.collection('subscribe').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
           
});
           
return res.redirect('/index.html');
})
//subscribe end   



add.get('/index',function(req,res){
res.set({
'Access-control-Allow-Origin': '*'
});
return res.redirect('/index.html');
}).listen(3000)


console.log("server listening at port 3000");