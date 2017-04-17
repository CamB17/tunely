var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');

//Create album schema
var AlbumSchema = new Schema({
	artistName:  String,
        name: String,
        releaseDate: String,
        genres: [String],
        songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

//allow export of album
module.exports = Album;