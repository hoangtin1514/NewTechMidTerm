var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/Lich_Su', function(req, res) {
    var db = req.db;
    var dc = db.get('DatCho');

    if (req.query.email == ''){
      res.status(400).send("bad request");
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(req.query.email)){
        res.status(400).send("Email is incorrect");
    }
    else
    {
      dc.find({
        email: req.query.email,
          }, function(err, result) {
              if (err) {
                  console.log(err);
                  res.status(500).send("Opps. Something went wrong!");
              }
              else {
                res.status(200).send(result);
              }
            });
    }
  });

module.exports = router;
