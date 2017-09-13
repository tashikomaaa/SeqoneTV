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

        tweets = tweet.text;
    })

    t.on('error', function (err) {
        console.log('Oh no')
    })
    feed.load(url, function (err, rss) {
        prog = rss.items;
        connection.connect(function (err) {
            for (var i = 0; i < rss.items.length; i++) {
                var channel = rss.items[i].title.split("|");
                var description = rss.items[i].description;
                t.track(channel[0])
                console.log("Connected!");
                var sql = "INSERT INTO programmes (title, channel, hour, content, url, date) VALUES ('" + channel[2] + "', '" + channel[0] + "', '" + channel[1] + "', '" + rss.items[i].description + "', '" + rss.items[i].url + "', NOW())";
                connection.query(sql, function (err, result) {

                });
            };
        });
        res.json(prog)
    });
});

router.get('/getChannel', (req, res) => {

    connection.connect(function (err) {
        var sql = "SELECT name, url, logo FROM channel LIMIT 8";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                channel = result;
            }
        })
    });
    console.log(channel);
    res.send(JSON.parse(JSON.stringify(channel)));

});

router.get('/getChannelProg', (req, res) => {
    connection.connect(function (err) {
        var sql = "SELECT name, url, logo FROM channel LIMIT 8";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                channel = result;
                console.log(channel.length);
                for (var i = 0; i < channel.length - 1; i++) {
                    progChan(channel[i]);
                }
            }
        })
    });
    function progChan(channelName) {

        connection.connect(function (error) {
            var sqlp = "SELECT title, channel, content, date, hour, programmes.url  FROM programmes LEFT OUTER JOIN channel ON name = channel WHERE channel LIKE '%" + channelName.name + "%' AND date = DATE_FORMAT(NOW()-1, '%Y-%m-%d') ORDER BY date DESC, hour DESC LIMIT 2";
            //console.log(sqlp);
            connection.query(sqlp, function (error, resultat) {
                console.log('query')
                if (error) {
                    console.log('error');
                    console.log(error);
                } else {
                    console.log('ok')
                    channelName.prog = resultat;
                    //console.log(channelName.prog);
                }
            })
        })
    }
    console.log(channel);
    res.send(JSON.parse(JSON.stringify(channel)));
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
        var sql = "SELECT * FROM programmes ODER BY channel";
        connection.query(sql, function (err, result) {
            console.log(result)
            prog = result;
        })
    })
    res.json(prog)
})



module.exports = router;