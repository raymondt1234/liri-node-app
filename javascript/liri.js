require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var spotify = new Spotify({
    id: "4c34bef2f10a453a84cbe442fe48d606",
    secret: "41995cd3b2544e30a0003b9cf8857737"
});

function trackSearch(track) {
    let artist;
    let song;
    let link;
    let album;
    spotify
        .search({ type: 'track', query: track })
        .then(function (response) {
            let firstResponse = response.tracks.items[0]
            
            artist = firstResponse.artists[0].name;
            song = firstResponse.album.name;
            link = firstResponse.external_urls.spotify;
            album = firstResponse.name;

            console.log(`
            Artist(s):          ${artist}
            Song title:         ${song}
            Listen on Spotify:  ${link}
            Album:              ${album}`);
            
        })
        .catch(function (err) {
            console.log(err);
        });
}
let option = process.argv[2];
let searchFor = process.argv[3];

switch (option) {
    case "concert-this":
        console.log("concert-this doesn't work yet...");
        break;
    case "spotify-this-song":
        trackSearch(searchFor);
        break;
    case "movie-this":
        console.log("movie-this doesn't work yet...");
        
        break;
    case "do-what-it-says":
        console.log("do-what-it-says doesn't work yet...");
        break;

    default:
        console.log("That isn't an option...");
        break;
}