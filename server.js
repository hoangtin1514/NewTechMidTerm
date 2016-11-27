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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
app.use('/', require('./routes/Chuyen_Bay'));
app.use('/', require('./routes/QuocGia'));
app.use('/', require('./routes/Tinh'));
app.use('/', require('./routes/KhachHang'));
app.use('/', require('./routes/DatVe'));
app.use('/', require('./routes/LichSu'));


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

    //Login: Facebook
    passport.use(new FacebookStrategy({
            clientID: '774277726045742',
            clientSecret: '79176e8df634987b5ccf6443cbe6386d',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'email'],
            session: false
        },
        function(accessToken, refreshToken, profile, cb) {
            var users = db.get('users');
            users.findOne({
                email: profile.emails[0].value
            }, function(err, user) {

                if (err) {
                    return cb(err);
                    console.log("Khong ket noi CSDL");
                }

                if (!user) {
                    // Tao user moi
                    var newUser = profile._json;
                    users.insert({
                        'name': newUser.name,
                        'email': newUser.email,
                        'type': 'User'
                    }, function(err, insertedDoc) {

                    });

                    var new_user = {
                        name: newUser.name,
                        email: newUser.email,
                        type: 'User'
                    }

                    console.log(new_user);

                    console.log("return new_user");

                    return cb(null, new_user);
                }
                console.log("return user");
                return cb(null, user);
            });
        }
    ));

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
