var mongoose = require('mongoose');
var models = require('./models');
var rating = require('./rating')

//Load schema type from mongoose to set types
var SchemaTypes = mongoose.Schema.Types;

//Load schemea library from models
var schema = models.Schema;

var localSchema = schema({

	name : String,
    city : String,
    stars : Number,
    company : String,
    imageUrl : String,
    geo: {type: [Number], index: '2d'}

});

localSchema.methods.findNear = function(distance,cb) {

    var result = this.model('local').find( { geo : { $near : this.geo, $maxDistance : distance/111.12 } },cb );
    console.log(result)
};

localSchema.methods.findById = function() {

    var result = this.model('local').find({id:this.id});
    console.log(result)
    return result;
};


var local = models.model('local', hotelSchema);
module.exports = local;