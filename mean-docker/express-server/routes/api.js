// Import dependencies
const http = require('https');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const request = require('request');
var prog = {};

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://127.0.0.1:27017/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    
})
// create mongoose schema

//User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String,
    channel: String,
    progPref: String,
    activ: Boolean,
    token: String,
    id: Number
});

//Channel schema
const channelSchema = new mongoose.Schema({
    name: String,
    logo: String,
    url: String,
    id: Number
});

//Programms schema
const programmsSchema = new mongoose.Schema({
    title: String,
    author: String,
    channel: String,
    thumbnail: String,
    hour: String,
    content: String,
    url: String,
    category: String,
    pubDate: String,
    guid: String
});

// create mongoose model

//create User model
const User = mongoose.model('User', userSchema);
//create Channel model
const Channel = mongoose.model('Channel', channelSchema);
//create Programms model 
const Programms = mongoose.model('Programms', programmsSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    //databaseFeed
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
        res.status(200).json(prog);

    });


});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    console.log('users')
    var rand = function(){
        return Math.random().toString(36).substr(2);//remove `0.`
    };
    var token = function(){
        return rand() + rand() //to make it longer
    };

    if (req.body.passConfirm == req.body.passwd) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwd: req.body.passwd,
            token: token
        });
    }

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});







module.exports = router;
