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
        })
});

// show single story
router.get('/show/:id', (req, res) => {
    Article.findOne({
            _id: req.params.id
        })
        .populate('user')
        .then(article => {
            res.render('articles/show', {
                article: article
            })
        });
})

// add articles form
router.get('/add', ensureAuthentication, (req, res) => {
    res.render('articles/add')
});

// edit articles form
router.get('/edit/:id', ensureAuthentication, (req, res) => {
    Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            res.render('articles/edit', {
                article: article
            })
        });
});

// process add story
router.post('/', (req, res) => {
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
});

// edit form
router.put('/:id', (req, res) => {
    Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            let allowComment;
            if (req.body.allowComment) {
                allowComment = true;
            } else {
                allowComment = false;
            }

            // new values
            article.title = req.body.title;
            article.body = req.body.body;
            article.status = req.body.status;
            article.allowComment = allowComment;

            article.save()
                .then(story => {
                    res.redirect('/dashboard');
                })
        });
});

// delete article
router.delete('/:id', (req, res) => {
    Article.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            res.redirect('/dashboard');
        })
})

module.exports = router;