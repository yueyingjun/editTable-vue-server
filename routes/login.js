var express = require('express');
var router = express.Router();
var connect=require("./mysql");
var crypto=require("crypto");



/* GET home page.
*
* */

router.post('/checkLogin', function(req, res, next) {
    var md5=crypto.createHash("md5");
    var uname=req.body.uname;
    var upass=md5.update(req.body.upass);

    upass=upass.digest("hex")


    connect.query(`select * from user where uname='${uname}' and upass='${upass}'`,function (err,result) {
        if(err){
            var obj={message:"err"}
            res.end(JSON.stringify(obj));
        }else{
            if(result.length>0){

                var obj={message:"ok",uname:uname,uid:result[0].uid}
                res.end(JSON.stringify(obj));
            }else{
                var obj={message:"err"}
                console.log(obj);
                res.end(JSON.stringify(obj));
            }
        }
    })
});

router.get("/reg",function (req,res) {

    var md5=crypto.createHash("md5");
    var uname=req.query.uname;
    var upass=md5.update(req.query.upass);
    upass=upass.digest("hex")

    connect.query(`insert into user (uname,upass) values ('${uname}','${upass}')`,function (err,result) {
        if(result.affectedRows>0){
            res.end("ok")
        }else{
            res.end("err");
        }
        
    })

})

module.exports = router;
