var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/api/v1/Dang_Nhap', passport.authenticate('local'),function(req, res){
  var resUser = {
    Username : req.user.name,
    Email:req.user.email
  };
    res.status(200).send(resUser);
  });

module.exports = router;
