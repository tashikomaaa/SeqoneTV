// Import dependencies
const http = require('https');
const express = require('express');
const router = express.Router();
const request = require('request');
const mysql =require('mysql');
const connection = mysql.createConnection({
    host : 'database_data:3306',
    user: 'corvus',
    passsword: '5eev2d2d1dlc'
});
var prog = {};


/* GET api listing. */
router.get('/', (req, res) => {
    //databaseFeed
    connection.connect();
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

    var options = {
        url: 'https://api.rss2json.com/v1/api.json?rss_url=' + url + '&api_key=zcuw0klitl9ogvspjdswma58hfrsmihkycnic1at&count=195',
        method: 'GET',
        json: true,
        dataType: 'json',
        contentType: 'application/json',
    }

    //request api's url
    request(options, function (err, response, json) {
        if (err) {
            throw err;
        }
        prog = json;
        prog = JSON.parse(JSON.stringify(prog.items));
        console.log('ok');
        prog.forEach(function(element) {
            console.log(element);
        }, this);
        res.status(200).json(prog);

    });


});









module.exports = router;
