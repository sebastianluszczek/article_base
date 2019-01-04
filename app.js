const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const port = process.env.PORT || 5000;

// passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('mongoDB connected...');
    })
    .catch(err => {
        console.log(err);
    });

const app = express();

// use routes
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('index')
});

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
})