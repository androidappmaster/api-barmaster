var express = require('express.io');
var server = express().http().io();
//For parameters 
server.use(express.urlencoded());

//Import models
var userModel = require("./model/user");


//Application token for minnimun secure
var applicationToken = "GtJqUn0AN5076anp5F53x35k29rTt4c1";


server.post("/user", function(req,res){

	console.log("Adding user");

	//Headers
	var authorization = req.get('Authorization');


	//Parameters
	var name = req.body.name
	var date = req.body.date;


	if(authorization != applicationToken){
		res.status(403).send("Unauthorized");
		return
	}

	//|| typeof date == 'undefined'
	if(typeof name == 'undefined'  ){
		res.status(400).send("Missing some parameters");
		return
	}

	//Create user 
	var user = new userModel({
		name : name	
	});

	//Save the user in database
	user.save(function(error){
		if(error){
			console.log(error);
			res.status(500).send("Error when save in database");
		}
		res.status(200).send(user);
	});
	
});

server.get('/user', function(req, res) {

	var authorization = req.get('Authorization');

	if(authorization != applicationToken){
		res.status(403).send("Unauthorized");
		return
	}
	
    userModel.find({}, function (err, users) {
       res.send(users);
   });

});

console.log("Server started");
server.listen(9999);