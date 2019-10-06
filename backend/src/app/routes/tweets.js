const routes = require('express').Router();

const TweetController = require('../controllers/TweetController');

const tweet = new TweetController();

routes.route('/')
    .get(tweet.index)
    .post(tweet.store);

module.exports = routes;