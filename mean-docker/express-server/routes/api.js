// Import dependencies
const http = require('https');
const express = require('express');
const router = express.Router();
const request = require('request');
const mysql =require('mysql');
const feed = require('rss-to-json');
const connection = mysql.createConnection({
    host : 'database',
    user: 'root',
    password: '5eev2d2d1dlc',
    database: 'seqone'
});
var prog = { };


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

    feed.load(url, function(err, rss){
        //console.log(rss.items);
        prog = rss.items;
        for (var index = 0; index <= rss.length; index++) {
            var title = rss.items[index].title.split("|");
            console.log(title)
        }
        
        res.json(rss.items)
    });

});












module.exports = router;
