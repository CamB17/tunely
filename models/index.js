var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

//require Album
var Album = require('./album');
var Song = require('./song');

//export album
module.exports.Album = Album;
module.exports.Song = Song;