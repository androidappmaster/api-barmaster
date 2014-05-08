var mongoose = require('mongoose');

//Connecting to database
mongoose.connect('mongodb://localhost/' + 'hotel-api-2');

//For import from others js files
module.exports = mongoose;
