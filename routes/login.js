var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res) {
    if (req.user === undefined) {
        res.render('login.ect', {});
    } else {
        res.redirect('/');
    }
})


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['email']}
));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log("Login facebook thanh cong")
      res.redirect('/');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
          // Authenticated successfully
          res.redirect('/');
});


module.exports = router;
