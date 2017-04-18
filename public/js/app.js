/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */



// wait until document is ready and then get albums
$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/albums').success(function (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });


// when form submits, serialize form data and post it to api
  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST request is ', album);

      //render the response from the server
      renderAlbum(album);  
    });
    $(this).trigger("reset");
  });


  $('#albums').on('click', '.add-song', function(e) {
    var id= $(this).parents('.album').data('album-id');
    console.log("This is equal to " + this);
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
  });

  $('#saveSong').on('click', handleNewSongSubmit);

});


// handles the modal fields and POSTing the form to the server
function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
  console.log(albumId);
  var songName = $('#songName').val();
  console.log(songName);
  var trackNumber = $('#trackNumber').val();
  console.log(trackNumber);

  var formData = {
    name: songName,
    trackNumber: trackNumber
  };

  var postUrl = '/api/albums/' + albumId + '/songs';
  console.log('posting to ', postUrl, ' with data ', formData);

  $.post(postUrl, formData)
    .success(function(song) {
      console.log(song);

      $.get('/api/albums/' + albumId).success(function(album) {
        $('[data-album-id='+ albumId + ']').remove();
        renderAlbum(album);
      });

      //clear form
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('hide');

    });
}



function buildSongsHtml(songs) {

  // make a long dash
  var songText = "    &ndash; ";
  songs.forEach(function(song) {
    songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHtml  =
   "                      <li class='list-group-item'>" +
   "                        <h4 class='inline-header'>Songs:</h4>" +
   "                         <span>" + songText + "</span>" +
   "                      </li>";
  return songsHtml;
}



// this function renders one album to page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-name'>" + album.releaseDate + "</span>" +
  "                      </li>" +
//adds songs as fourth li element in loop
  buildSongsHtml(album.songs) +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  $('#albums').prepend(albumHtml);
 }
