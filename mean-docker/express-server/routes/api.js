// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Feed = require('rss-to-json');

const program = '';

Feed.load('http://www.telerama.fr/rss/une.xml', function(err, rss) {
    program = rss;
})
console.log(program);
// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const channelSchema = new mongoose.Schema({
    _id: String,
    channel_name: String,
    icon: {
        _src: String,
    },
    channelID: String
});

const programSchema = new mongoose.Schema({
    start: String,
    stop: String,
    showview: Number,
    channel: String,
    title: String,
    sub_title: String,
    desc: String,
    credits: {
        director: String,
        actor: Array
    },
    date: Number,
    category: Array,
    icon: {
        src: String
    },
    episode_num: String,
    video: {
        aspect: String,
        quality: String
    },
    audio: {
        stereo: String
    },
    premire: {},
    subtitles: {
        type: String
    },
    language: String,
    rating: {
        system: String
    },
    value: String,
    icon: {
        src: String
    },
    star_rating: {
        value: String
    }
})

//create mongoose model for program
const Program = mongoose.model('Program', programSchema);
// create mongoose model for channel
const Channel = mongoose.model('Channel', channelSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* GET all channels. */
router.get('/channels', (req, res) => {
    Channel.find({}, (err, channels) => {
        if (err) res.status(500).send(error)

        res.status(200).json(channels);
    });
});


module.exports = router;