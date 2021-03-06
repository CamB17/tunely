// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
//require mongoose
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
/************
 * DATABASE *
 ************/

//require ./models db
var db = require('./models');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

//Sprint 1 step 2
app.get('/api/albums', function album_index(req, res){
    //access db to pull all{} albums
    db.Album.find({}, function(err, albums) {
      res.json(albums);
    });
});

//Sprint 2 step 3 POST route
app.post('/api/albums', function album_index(req,res) {
    console.log('body', req.body);


var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;
    
    db.Album.create(req.body, function(err, album) {
      if(err) { console.log('error', err); }
      console.log(album);
      res.json(album);
    });
});

app.get('/api/albums/:id', function albumShow(req, res) {
  console.log('requested album id=', req.params.id);
  db.Album.findOne({_id: req.params.id}, function(err, album) {
    res.json(album);
  });
});


app.post('/api/albums/:albumId/songs', function songsCreate(req, res) {
  console.log('body', req.body);
  db.Album.findOne({_id: req.params.albumId}, function(err, album) {
    if (err) { console.log('error', err); }

    var song = new db.Song(req.body);
    album.songs.push(song);
    album.save(function(err, savedAlbum) {
      if (err) { console.log('error', err); }
      console.log('new song saved on:', savedAlbum);
      res.json(song);
    });
  });

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
