const express = require('express');
const router = express.Router();
console.log('tweets')
const Twitter = require('node-tweet-stream')
    , t = new Twitter({
        consumer_key: 'CzqL9NavfRCKlwOwJvcAYt43P',
        consumer_secret: '1jDGdcuanqYOyTzkBQhFNuvG8W6vjyDuBdsqZCDBGhs95hQFv4',
        token: '855359882324738048-OnTnlUC4OLQhL6ahoXl5vCEYPXZYAAb',
        token_secret: 'fT91m86gqAtVetKDhnnNaz1aybb3IM7LqbrkX6lDDqJWu'
    })


router.get('/tweets', (req, res) => {

    t.on('tweet', function (tweet) {
        console.log('tweet received', tweet)
    })

    t.on('error', function (err) {
        console.log('Oh no')
    })

    t.track('nodejs')
    t.track('pizza')

    // 5 minutes later
    t.track('tacos')

    // 10 minutes later
    t.untrack('pizza')
})

module.exports = router;


