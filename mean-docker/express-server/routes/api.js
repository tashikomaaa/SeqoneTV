// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

// create mongoose model
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