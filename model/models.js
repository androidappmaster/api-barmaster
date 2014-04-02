var mongoose = require('mongoose');

//Connecting to database
mongoose.connect('mongodb://localhost/' + 'oshwcon2014');

//For import from others js files
module.exports = mongoose;
