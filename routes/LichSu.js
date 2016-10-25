var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/Lich_Su', function(req, res) {
    var db = req.db;
    var dv = db.get('DatVe');

    if (req.query.email == ''){
      res.status(400).send("bad request");
    }
    else
    {
      dv.find({
        emailUser: req.query.email,
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
