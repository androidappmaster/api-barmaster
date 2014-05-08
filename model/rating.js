var mongoose = require('mongoose');
var models = require('./models');

//Load schema type from mongoose to set types
var SchemaTypes = mongoose.Schema.Types;
//Load schemea library from models
var schema = models.Schema;
var ObjectId = schema.ObjectId;

var ratingSchema = schema({

	rating : Number,
    comment : String,
    hotel : ObjectId
});


var rating = models.model('rating', ratingSchema);
module.exports = rating;