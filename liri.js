require("dotenv").config();

const Spotify = require("node-spotify-api");

const axios = require("axios");

const moment = require("moment");

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

            console.log("");
            console.log(`Artist(s):          ${artist}`);
            console.log(`Song title:         ${song}`);
            console.log(`Listen on Spotify:  ${link}`);
            console.log(`Album:              ${album}`);

        })
        .catch(function (error) {
            console.log(error);
        });
}
function concertThis(band) {
    let url = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;

    axios
        .get(url)
        .then(function (response) {
            let concerts = response.data;

            if (concerts.length > 0) {
                concerts.forEach(function (concert) {
                    let date = moment(concert.datetime).format("MM/DD/YYYY");

                    console.log("");
                    console.log(`Venue:     ${concert.venue.name}`);
                    console.log(`Location:  ${concert.venue.location}`);
                    console.log(`Date:      ${date}`);
                });
            } else {
                console.log("Nothing was found for that Artist/Band.");
            }
        });
}
function movieThis(movie) {
    let key = process.env.OMDb_KEY;
    let url = `http://www.omdbapi.com/?t=${movie}&y=&plot=full&tomatoes=true&apikey=${key}`;

    axios
        .get(url)
        .then(function (response) {
            let movieInfo = response.data;

            console.log("");
            console.log(`Title:                     ${movieInfo.Title}`);
            console.log(`Year:                      ${movieInfo.Year}`);
            console.log(`IMDb Rating:               ${movieInfo.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating:    ${movieInfo.Ratings[1].Value}`);
            console.log(`Produced in:               ${movieInfo.Country}`);
            console.log(`Language:                  ${movieInfo.Language}`);
            console.log(`Actors:                    ${movieInfo.Actors}`);
            console.log(`Plot:                      ${movieInfo.Plot}`);
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
        movieThis(searchFor);
        break;

    case "do-what-it-says":
        console.log("do-what-it-says doesn't work yet...");
        break;

    default:
        console.log("That isn't an option...");
        break;
}