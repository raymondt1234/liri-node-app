require("dotenv").config();


const Spotify = require("node-spotify-api");

const axios = require("axios");

const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

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
            song = firstResponse.name;
            link = firstResponse.external_urls.spotify;
            album = firstResponse.album.name;


            console.log(`
            Artist(s):          ${artist}
            Song title:         ${song}
            Listen on Spotify:  ${link}
            Album:              ${album}`);
            
        })
        .catch(function (error) {
            console.log(error);
        });
}
function concertThis(band){
    let url = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;
    axios
        .get(url)
        .then(function(response){
            let concerts = response.data;
            
            if (concerts.length > 0) {
                concerts.forEach(function(concert) {
                    console.log(`       Venue:     ${concert.venue.name}`);
                    console.log(`       Location:  ${concert.venue.location}`);
                    console.log(`       Date:      ${concert.datetime}\n`);
                });
            } else {
                console.log("Nothing was found for that Artist/Band.");
            }
        });
}

let option = process.argv[2];
let searchFor = process.argv[3];

switch (option) {
    case "concert-this":
        concertThis(searchFor);
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