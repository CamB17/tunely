var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create album schema
var AlbumSchema = new Schema({
	artistName:  String,
        name: String,
        releaseDate: String,
        genres: [String]
});

var Album = mongoose.model('Album', AlbumSchema);

//allow export of album
module.exports = Album;