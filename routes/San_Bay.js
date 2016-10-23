var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/San_Bay', function(req, res) {
  var db = req.db;
  var sb = db.get('SanBay');
  sb.find({
  },function(err, result){
      if (err){
        console.log(err);
        res.status(500).send('something went wrong');
      }
      else {
        console.log(result);
        res.status(200).send(result);
      }
  })
});

module.exports = router;
