const express = require('express');
const router = express.Router();
const {
    ensureAuthentication,
    ensureGuest
} = require('../helpers/auth');
const mongoose = require('mongoose');
const Article = mongoose.model('articles');
const User = mongoose.model('users');

// articles index
router.get('/', (req, res) => {
    Article.find({
            status: 'public'
        })
        .populate('user')
        .then(articles => {
            res.render('articles/index', {
                articles: articles
            });
            console.log(articles);
        })
});

// add articles form
router.get('/add', ensureAuthentication, (req, res) => {
    res.render('articles/add')
});

// process add story
router.post('/', (req, res) => {
    console.log(req.body);

    let allowComment;
    if (req.body.allowComment) {
        allowComment = true;
    } else {
        allowComment = false;
    }

    const newArticle = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComment: allowComment,
        user: req.user.id
    }

    // create story
    new Article(newArticle)
        .save()
        .then(story => {
            res.redirect(`/articles/show/${story.id}`)
        })
})

module.exports = router;