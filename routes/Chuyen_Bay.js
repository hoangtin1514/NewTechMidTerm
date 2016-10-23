var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/Chuyen_Bay', function(req, res) {
    var db = req.db;
    var cb = db.get('ChuyenBay');

    if (req.query.SanBayDen == '' || req.query.SanBayDi == '' ){
      res.status(400).send("bad request");
    }

    cb.find({
      sbDen: req.query.SanBayDen,
      sbDi: req.query.SanBayDi
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Opps. Something went wrong!");
            }
            else {
              res.status(200).send(result);
            }
          });
    });

module.exports = router;
