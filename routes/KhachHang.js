var express = require('express');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/api/v1/Khach_Hang', function(req, res) {
    var KH = req.db.get('KhachHang');
        KH.insert({"Ho" : req.param('ho'),
            "Ten" : req.param('ten'),
            "DiaChi" : req.param('diaChi'),
            "ThanhPho" : req.param('thanhPho'),
            "Tinh" : req.param('tinh'),
            "Email" : req.param('email'),
            "DTDD" : req.param('sdtdd'),
            "SDT" : req.param('sdt'),
            "SoHC" : req.param('soHoChieu'),
            "HCNuoc" : req.param('hoChieu'),
            "NgayHetHanHoChieu" : req.param('ngayHetHanHoChieu'),
            "QuocTich" : req.param('quocTich'),
            "QuyDanh" : req.param('quyDanh')
        }, function (err, result){    
            if(err){
                console.log(err);
                res.send(500, 'something went wrong');                 
            } else {
                console.log(result);        
                res.status(200).send("success");
            }
            
        });
});

module.exports = router;
