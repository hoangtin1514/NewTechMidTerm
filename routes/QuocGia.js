var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/v1/Quoc_Gia', function(req, res) {
    var QG = req.db.get('QuocGia');
        QG.find({"ChauLuc.MaCL" : "A"}, function (err, result){    
            if(err){
                console.log(err);
                res.send(500, 'something went wrong');
            } else {
                console.log(result);        
                res.status(200).send(result);
            }
            
        });
});

module.exports = router;
