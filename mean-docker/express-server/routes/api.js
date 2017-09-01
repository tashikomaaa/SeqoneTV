// Import dependencies
const http = require('https');
const express = require('express');
const router = express.Router();
const request = require('request');
const mysql = require('mysql');
const feed = require('rss-to-json');
const connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: '5eev2d2d1dlc',
    database: 'seqone'
});
var prog = {};


/* GET api listing. */
router.get('/', (req, res) => {

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

                console.log(description)
                console.log("Connected!");
                var sql = "INSERT INTO programm (title, channel, hour, content, url, date) VALUES ('" + channel[2] + "', '" + channel[0] + "', '" + channel[1] + "', '" + rss.items[i].description + "', '" + rss.items[i].url + "', NOW())";
                console.log(sql);
                connection.query(sql, function (err, result) {
                    console.log("1 record inserted");
                });
            };
        });

        res.json(rss.items)
    });

});


module.exports = router;