const express = require('express');
const router = express.Router();
const {
    ensureAuthentication,
    ensureGuest
} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome')
});

router.get('/dashboard', ensureAuthentication, (req, res) => {
    res.render('index/dashboard');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;