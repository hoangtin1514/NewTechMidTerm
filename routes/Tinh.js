var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/Tinh', function(req, res) {
    var T = req.db.get('Tinh');
        T.find({"MaQG" : req.param('MaTinh')}, function (err, result){    
            if(err){
                console.log(err);
                res.send(500, 'something went wrong');               
            } else {
                console.log(result);        
                res.send(200, result);
            }
            
        });
});

module.exports = router;
