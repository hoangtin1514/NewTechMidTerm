var express = require('express');
var session = require('express-session')
var app = express();
var ect = require('ect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jshare = require('jshare');


//===============EXPRESS================
app.use(jshare());
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat'
}))
app.use(passport.initialize());
app.use(passport.session());

var ectRenderer = ect({
    watch: true,
    root: __dirname + '/views',
    ext: '.ect'
});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(function(req, res, next) {
    req.db = db;
    next();
});

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('admin:admin@ds063546.mlab.com:63546/new_tech');
//===============ROUTES===============

app.use('/', require('./routes'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/San_Bay'));

//===============PORT=================
app.listen(process.env.PORT || 3000, function() {
    console.log('now listening on http://localhost:3000');
});

//==================PASSPORT==============
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function(email, password, cb) {
        var users = db.get('users');
        users.findOne({
            email: email
        }, function(err, user) {
            if (err) {
                console.log("Khong ket noi CSDL");
                return cb(err);
            }

            if (!user) {
                return cb(null, false);
            }

            if (user['password'] != password) {
                console.log("Sai password");
                return cb(null, false);
            }
            console.log("Login thanh cong");
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    console.log("bat dau serializeUser");
    console.log("user email = " + user.email);
    cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
    console.log("bat dau deserializeUser");
    console.log("email = " + email);
    var users = db.get('users');
    users.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            console.log("Login error: Cannot find user");
            return cb(err);
        }
        console.log("Ket qua deserializeUser:");
        console.log(user);
        cb(null, user);
    });
});
