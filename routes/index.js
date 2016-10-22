var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.user === null || req.user === undefined) {
        res.redirect('/login');
    } else {
        res.redirect('/SomeInterestingPage');
    }
});

module.exports = router;
