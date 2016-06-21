// Récupère l'ID d'une chaîne Youtube en fonction de l'utilisateur
function getChannelID(){
    var APIKey = "&key=AIzaSyBTjT8ogtxLFK97IsXtPKQ0pLaCy9sy5Ng" // Clé Google API généré par la console Google (gestionnaire d'API)
    var youtubeUser =  $( "#srch-term" ).val(); // On récupère ce qui a été tapé
    var channel = "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=" + youtubeUser + APIKey; // On construit l'adresse de la requête

    // On lance la requête AJAX
    $.ajax({
        async: false,
        url: channel,
        error: function (error) {
          alert('error; ' + eval(error));
        },
        success: function(data) {
          try {
            var channelID = data.items[0].id;
            getVideosFromChannel(channelID);
          }
          catch(err) {
            $('#liste-videos').empty(); // On vide la liste de vidéos (au cas ou elle soit remplie)
            $('#readme').remove(); // On supprime le F.A.Q
            $('#YTUsername').empty(); // On vide le titre
            $('#YTUsername').append('Erreur'); // On remplie le titre
            $('#liste-videos').append('<h2>Utilisateur introuvable</h2>'); // Affichage erreur
          }
        }
    });

     return false;
  }

  function getVideosFromChannel(channelID){
    var APIKey = "&key=AIzaSyBTjT8ogtxLFK97IsXtPKQ0pLaCy9sy5Ng" // Clé Google API généré par la console Google (gestionnaire d'API)
    var channel = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelID + "&maxResults=10" + APIKey; // On construit la requête

    // On lance la requête AJAX
    $.ajax({
        async: false,
        url: channel,
        error: function (error) {
          alert('error; ' + eval(error));
        },
        success: function(data) {

          $('#liste-videos').empty(); // On vide la liste de vidéos (au cas ou elle soit remplie)
          $('#readme').remove(); // On supprime le F.A.Q
          $('#YTUsername').empty(); // On vide le titre
          $('#YTUsername').append(data.items[0].snippet.channelTitle); // On remplie le titre

          $.each( data.items, function( i, item ) {
            // On construit la bloc visuel du front a partir des infos du JSON
            $('#liste-videos').append('<div class="jumbotron" id="jumbVid' + i + '">');
              $('#jumbVid' + i).append('<div class="container" id="contVid' + i + '">');
                $('#contVid' + i).append('<div class="row" id="rowVid' + i + '">');
                  $('#rowVid' + i).append('<div class="col-md-7" id="col7Vid' + i + '">');
                    $('#col7Vid' + i).append('<div id="player-'+(item.id.videoId)+'">');$('#liste-videos').append('</div>');
                  $('#col7Vid' + i).append('</div>');
                  $('#rowVid' + i).append('<div class="col-md-5" id="col5Vid' + i + '">');
                    $('#col5Vid' + i).append('<h3>'+(item.snippet.title)+'</h3>');
                    $('#col5Vid' + i).append('<h4>'+(item.snippet.description)+'</h4>');
                  $('#col5Vid' + i).append('</div>');
                $('#rowVid' + i).append('</div>');
              $('#contVid' + i).append('</div>');
            $('#jumbVid' + i).append('</div>');

            // On construit crée le player pour la vidéo
            new YT.Player('player-'+(item.id.videoId), {
              height: '200',
              width: '400',
              videoId: item.id.videoId,
              events: {
              'onReady': function(){}
              }
            });
          });
        }
    });

    return false;
  }
