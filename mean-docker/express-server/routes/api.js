// Import dependencies
const http = require('https');
const express = require('express');
const router = express.Router();
const request = require('request');
const mysql = require('mysql');
const feed = require('rss-to-json');

const Twitter = require('node-tweet-stream')
    , t = new Twitter({
        consumer_key: 'CzqL9NavfRCKlwOwJvcAYt43P',
        consumer_secret: '1jDGdcuanqYOyTzkBQhFNuvG8W6vjyDuBdsqZCDBGhs95hQFv4',
        token: '855359882324738048-OnTnlUC4OLQhL6ahoXl5vCEYPXZYAAb',
        token_secret: 'fT91m86gqAtVetKDhnnNaz1aybb3IM7LqbrkX6lDDqJWu'
    })

const connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: '5eev2d2d1dlc',
    database: 'seqone'
});
var prog = {};
var nextProg = {};
var channel = {};
var tweets = {};

/* GET api listing. */
router.get('/feed', (req, res) => {
    setInterval(feedData, 86400000);
    function feedData() {
        //get the date
        var date = new Date();

        //get day
        var day = date.getUTCDate();
        if (day < 10)
            day = '0' + day

        //get month
        var month = date.getUTCMonth() + 1;
        if (month < 10)
            month = '0' + month

        //get year
        var year = date.getUTCFullYear();

        var url = 'https://webnext.fr/epg_cache/programme-tv-rss_' + day + '-' + month + '-' + year + '.xml';
        t.on('tweet', function (tweet) {
            //console.log('|', tweet.text, '|')
            tweets = tweet.text;
        })

        t.on('error', function (err) {
            console.log('Oh no')
        })
        feed.load(url, function (err, rss) {
            //console.log(rss.items);
            prog = rss.items;
            console.log(rss.items)
            connection.connect(function (err) {
                for (var i = 0; i < rss.items.length; i++) {
                    var channel = rss.items[i].title.split("|");
                    var description = rss.items[i].description;
                    console.log(channel);
                    //console.log(rss.items[i].description)
                    t.track(channel[0])
                    console.log(description)
                    console.log("Connected!");
                    var sql = "INSERT INTO programm (title, channel, hour, content, url, date) VALUES ('" + channel[2] + "', '" + channel[0] + "', '" + channel[1] + "', '" + rss.items[i].description + "', '" + rss.items[i].url + "', NOW())";
                    console.log(sql);
                    connection.query(sql, function (err, result) {
                        //console.log("1 record inserted");
                    });
                };
            });

            res.json(prog)
        });
    }

});

router.get('/channel', (req, res) => {

    connection.connect(function (err) {
        var sql = "SELECT * FROM channel";
        connection.query(sql, function (err, result) {
            channel = result;
        })
    });

});

router.get('/channelProg', (req, res) => {
    connection.connect(function (err) {
        var sql = "SELECT * from programm WHERE channel = '" + req.body.channel + "' ORDER BY date";
        connection.query(sql, function (err, result) {
            prog = result;
        })
    })
})

router.get('/getProgs', (req, res) => {
    /*     connection.connect(function(err){
            var sql = "SELECT * FROM programm ORDER BY hour";
            connection.query(sql, function(err, result){
                console.log(result)
                nextProg = result;
            })
        }) */


    connection.connect(function (err) {
        var sql = "SELECT * FROM programm";
        connection.query(sql, function (err, result) {
            console.log(result)
            prog = result;
        })
    })
    res.json(prog)
})

router.get('/tweets', (req, res) => {
    
        t.on('tweet', function (tweet) {
            console.log('tweet received', tweet.text)
        })
    
        t.on('error', function (err) {
            console.log('Oh no')
        })
    
        t.track('france3')
        t.track('france2')
        t.track('tf1')
        t.track('canal+')

    }); 

module.exports = router;