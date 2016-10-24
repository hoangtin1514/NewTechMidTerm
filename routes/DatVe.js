var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/api/v1/Dat_ve', function(req, res) {
    var KH = req.db.get('DatVe');
        KH.insert({
        	"maCb" : req.param('maCb'),
        	"SLVeThuong" : req.param('SLVeThuong'),
        	"SLVeVip" : req.param('SLVeVip'),
        	"TongTien" : req.param('TongTien')

   		 }, function (err, result){    
            if(err){
                res.send(500, "error");                 
            } else {
                console.log(result);        
                res.status(200).send("success");
            }
            
        });
});

module.exports = router;
