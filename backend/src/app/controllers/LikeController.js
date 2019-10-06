const Tweet = require('../models/Tweet');

class LikeController {

    async store (req, res) {

        const { id } = req.params;

        const tweet = await Tweet.findById(id);

        tweet.set( { likes : tweet.likes + 1});

        await tweet.save();

        req.io.emit('like', tweet);

        return res.status(200).json(tweet);
    }
}

module.exports = LikeController;