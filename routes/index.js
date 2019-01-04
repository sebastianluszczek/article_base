const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('articles');
const {
    ensureAuthentication,
    ensureGuest
} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome')
});

router.get('/dashboard', ensureAuthentication, (req, res) => {
    Article.find({
            user: req.user.id
        })
        .then(articles => {
            res.render('index/dashboard', {
                articles: articles
            });
        });
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;