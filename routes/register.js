var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/api/v1/Dang_Ky', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(req.body.email)) {
        users.findOne({
            email: req.body.email
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result != null) {
                res.status(409).send("This email is already registered!");
                console.log("User exists");
            } else if (req.body.name != '' && req.body.password != '') {
                users.insert({
                    'email': req.body.email,
                    'name': req.body.name,
                    'password': req.body.password,
                    'type': 'User'
                }, function(err, insertedDoc) {
                    if (insertedDoc != null) {
                        passport.authenticate('local')(req, res, function() {
                            var resUser = {
                              Username : req.user.name,
                              Email:req.user.email
                            };
                            res.status(201).send(resUser);
                            console.log("Success");
                        });
                    }
                });
            } else {
                res.status(400).send("Name or password is empty");
                console.log("Name or password is empty");
            }
        });
    } else {
        res.status(400).send("Email is incorrect");
        console.log("Email is incorrect");
    }
});

module.exports = router;
