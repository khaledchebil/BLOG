const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const myDB = require('./config/db')
const app = express();
var bodyParser = require('body-parser')
// const Articles = require('./Models/Articles')
// Passport Config
require('./config/passport')(passport);


myDB();


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/admin', require('./routes/admin.router.js'));

// Express body parser
app.use(express.urlencoded({ extended: true }));


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// app.use('/articles', router)
app.use('/articles', require('./routes/articles.js'));
//admin

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: true }));

const port = process.env.port||5000;

    app.listen(port,()=>{
        try{
                 console.log('server is running on port',port)
        } catch(err){
                 console.log('connection failed', err)
        }
    })