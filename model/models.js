var mongoose = require('mongoose');

//Connecting to database
mongoose.connect('mongodb://localhost/' + 'appmaster');

//For import from others js files
module.exports = mongoose;
