// Import dependencies
const http = require('https');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const request = require('request');
var prog = {};

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
    login: String,

});

// create mongoose model
const User = mongoose.model('User', userSchema);

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
        url: 'https://api.rss2json.com/v1/api.json?rss_url=' + url + '&api_key=zcuw0klitl9ogvspjdswma58hfrsmihkycnic1at&count=199',
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
        prog = JSON.parse(JSON.stringify(prog));
        console.log(prog.status);
        for (var i = 0; i <= prog.items.length; i++) {
            //feed database 
            let programm = new programm({
                title: prog.items[i].title,
                age: req.body.age
            });

            user.save(error => {
                if (error) res.status(500).send(error);

                res.status(201).json({
                    message: 'User created successfully'
                });
            });
        }

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
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});







module.exports = router;
