require("dotenv").config();
var Twit = require('twit');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const numTweets = 200;
var T = new Twit({
    consumer_key:         process.env.API_KEY,
    consumer_secret:      process.env.API_SECRET_KEY,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.post("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    T.get('statuses/user_timeline', { screen_name: req.body.user.name, count: numTweets })
    .then((result) => {
        res.send(result);
    })
})

app.listen(port, () => console.log("listening on port " + port));