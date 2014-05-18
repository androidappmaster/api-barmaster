var express = require('express.io');
var server = express().http().io();

// For parameters 
server.use(express.urlencoded());

// Import models
var localModel = require("./model/local");
var ratingModel = require("./model/rating");

// TODO Create funtions in vars, routing , auth, cath erros, error response codes.

/**
 * POST LOCAL INTO DATABASE
 */
server.post("/locals", function(req,res){

	console.log("Adding local");

	// Parameters
	var name = req.body.name
	var city = req.body.city
	var stars = req.body.stars
	var company = req.body.company
	var imageUrl = req.body.imageUrl
    var lattitude = req.body.lattitude
    var longittude = req.body.longittude


	//|| typeof date == 'undefined'
	if ( typeof name == 'undefined' ){
		res.status(400).send("Missing some parameters");
		return
	}

	// Create local
	var local = new localModel({
		name : name,
        city : city,
        stars : stars,
        company: company,
        imageUrl: imageUrl,
        geo : [longittude,lattitude]
	});

	// Save the local in database
    local.save(function(error){
		if(error){
			console.log(error);
			res.status(500).send("Error when saving into database");
		}
		res.status(200).send(local);
	});
	
});

/**
 * GET A LIST OF HOTELS
 */
server.get('/locals', function(req, res) {

    localModel.find({}, function (error, hotels) {
        if(error){
            console.log(error);
            res.status(404).send("Local not found");
        }
       res.send(hotels);
   });

});


/**
 *  SEARCH HOTEL BY NEAR OF POINT IN KM
 */
server.get('/locals/near', function(req,res){
    var lattitude = req.param('lattitude')
    var longittude = req.param('longittude')
    var distance = req.param('distance')

    console.log(lattitude)
    console.log(longittude)

    var locals = new localModel({geo: [longittude,lattitude]});

    locals.findNear(distance,function(error,results) {
        if(error) {
            console.log(error);
            res.status(404).send("Local not found");
        }
        res.send(results);
    });

});

/**
 *  Update local
 */
server.put("/locals/:id", function(req,res){

    // Parameters
    var id = req.param('id');
    var name = req.body.name
    var city = req.body.city
    var stars = req.body.stars
    var company = req.body.company
    var imageUrl = req.body.imageUrl
    var lattitude = req.body.lattitude
    var longittude = req.body.longittude

    localModel.findById(req.param('id'),function(error,result){

        result.name = name;
        result.city = city;
        result.stars = stars;
        result.company = company;
        result.imageUrl = imageUrl;
        result.latitude = lattitude;
        result.longitude = longittude;

        // Save the local in database
        result.save(function(error) {
            if(error) {
                console.log(error);
                res.status(500).send("Error when save in database");
            }
            res.status(200).send(result);
        });
    });

});

/**
 * Get local by id
 */
server.get("/locals/:id",function(req,res){

    var id = req.param('id');

    localModel.find({_id:req.param('id')},function(error,result){
        if(error){
            console.log(error);
            res.status(404).send("Local not found");
        }
        res.send(result);
    });

});

/**
 *  Get local ratings
 */
server.get('/locals/:id/comments', function(req,res){

    ratingModel.find({local:req.param('id')},function(error,result){
        if(error){
            console.log(error);
            res.status(404).send("Local not found");
        }
        res.send(result);
    })
});


/**
 *  Add rating to local
 */
server.post('/locals/:id/comments', function(req,res){

    var rating = req.param('rating')
    var comment = req.param('comment')

    var rating = new ratingModel({
        rating: rating,
        comment: comment,
        local: req.param('id')
    });

    // save rating
    rating.save(function(error) {
        if(error) {
            console.log(error);
            res.status(500).send("Error saving comment")
        }
        res.send(rating);
    });

});

console.log("Server started");
server.listen(9999);