var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

//require Album
var Album = require('./album');

//export album
module.exports.Album = Album;