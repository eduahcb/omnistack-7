const Tweet = require('../models/Tweet');

class TweetController {

    async index (req, res) {

        try {

            const tweets = await Tweet.find({}).sort('-createdAt');

            return res.status(200).json(tweets);

        } catch (error) {
            
            return res.status(error);
        }
    }

    async store (req, res) {

        try {
            
            const tweet = await Tweet.create(req.body);

            req.io.emit('tweet', tweet);

            return res.status(200).json(tweet);

        } catch (error) {
            
        }

    }
}

module.exports = TweetController;