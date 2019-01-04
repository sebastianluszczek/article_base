const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//load db models
require('./models/User');
require('./models/Article');

const port = process.env.PORT || 5000;

// passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const articles = require('./routes/articles');

// map global promises
mongoose.Promise = global.Promise;

// handlebars helpers
const {
    truncate,
    stripTags,
    formateDate,
    select
} = require('./helpers/hbs');

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

// body-parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// method-override middleware
app.use(methodOverride('_method'));

// handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formateDate: formateDate,
        select: select
    },
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
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/articles', articles);


app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
})