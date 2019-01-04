const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const port = process.env.PORT || 5000;

// passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');

// map global promises
mongoose.Promise = global.Promise;

// mongoose connect
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

// handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// cookie parser middleware
app.use(cookieParser());

// express-session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// use routes
app.use('/auth', auth);
app.use('/', index);


app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
})