const routes = require('express').Router();

const LikeController = require('../controllers/LikeController');

const like = new LikeController();

routes.route('/:id')
    .post(like.store);

module.exports = routes;
