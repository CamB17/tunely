/* CLIENT-SIDE JS*/

$(document).ready(function() {
  console.log('app.js loaded!');
/*connect to new GET route for albums*/
$.get('./api/albums', function(albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
  });
});

$('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
      console.log('formData', formData);
$.post('/api/albums', formData, function(album) {
    console.log('album after POST', album);
//render server's response
    renderAlbum(album);
  });
  $(this).trigger("reset");
});

//
$('#albums').on('click', '.add-song', function(e) {
    var id = $(this).parents('.album').data('album-id');
    console.log("This is equal to " + this);
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
});
//save new song on click
$('#saveSong').on('click', handleNewSongSubmit);

});


//POST form to server
function handleNewsdongSubmit(e) {
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

//buildSongsHtml function
function buildSongsHtml(songs) {
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

// this function takes a single album and renders it to the page
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
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  //call buildSongs and pass in songs array
  buildSongsHtml(album.songs) +                    
  "                   </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

      // render to the page with jQuery
       $('#albums').append(albumHtml);
       //serialize form
    var formdata = $(this).serialize();
       $("form").on("submit", function(event) {
        event.preventDefault();
       console.log( $(this).serialize() );
        $(this).trigger("reset");
    });     


  }
