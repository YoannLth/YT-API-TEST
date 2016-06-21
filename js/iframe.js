// Charge l'IFrame Player API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Crée un <iframe> (player YouTube)
var player;
function onYouTubeIframeAPIReady() {}

function onPlayerReady(){}
