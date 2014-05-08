var express = require('express.io');
var server = express().http().io();
//For parameters 
server.use(express.urlencoded());

//Import models
var hotelModel = require("./model/hotel");
var ratingModel = require("./model/rating");

/**
 * POST HOTEL INTO DATABASE
 */
server.post("/hotel", function(req,res){

	console.log("Adding hotel");

	//Parameters
	var name = req.body.name
	var city = req.body.city
	var stars = req.body.stars
	var company = req.body.company
	var imageUrl = req.body.imageUrl
    var lattitude = req.body.lattitude
    var longittude = req.body.longittude




	//|| typeof date == 'undefined'
	if(typeof name == 'undefined'  ){
		res.status(400).send("Missing some parameters");
		return
	}

	//Create hotel
	var hotel = new hotelModel({
		name : name,
        city : city,
        stars : stars,
        company: company,
        imageUrl: imageUrl,
        geo : [longittude,lattitude]
	});

	//Save the hotel in database
    hotel.save(function(error){
		if(error){
			console.log(error);
			res.status(500).send("Error when save in database");
		}
		res.status(200).send(hotel);
	});
	
});

/**
 * GET A LIST OF HOTELS
 */
server.get('/hotel', function(req, res) {


	
    hotelModel.find({}, function (err, hotels) {
       res.send(hotels);
   });

});


/**
 *  SEARCH HOTEL BY NEAR OF POINT IN KM
 */
server.get('/hotel/near', function(req,res){
    var lattitude = req.param('lattitude')
    var longittude = req.param('longittude')
    var distance = req.param('distance')

    console.log(lattitude)
    console.log(longittude)

    var hotels = new hotelModel({geo: [longittude,lattitude]});

    hotels.findNear(distance,function(error,results){
        res.send(results);
    });


});

/**
 *  Get hotel rating
 */

server.get('/hotel/:id/rating', function(req,res){
    ratingModel.find({hotel:req.param('id')},function(error,result){
        res.send(result);
    })
});


/**
 *  Add rating to hotel
 */
server.post('/hotel/:id/rating', function(req,res){

    var rating = req.param('rating')
    var comment = req.param('comment')


            var rating = new ratingModel({
                rating: rating,
                comment: comment,
                hotel: req.param('id')
            });



           //save rating
            rating.save(function(error){
               if(error){
                   console.log(error);
                   res.send("Las liao parda")
               }
               res.send(rating);
           });


});




console.log("Server started");
server.listen(9999);