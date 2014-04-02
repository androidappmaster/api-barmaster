var mongoose = require('mongoose');
var models = require('./models');

//Load schema type from mongoose to set types
var SchemaTypes = mongoose.Schema.Types;
//Load schemea library from models
var schema = models.Schema;

var userSchema = schema({

	name : String,
	time : { type: Date, default: Date.now}
});

var user = models.model('user', userSchema);
module.exports = user;