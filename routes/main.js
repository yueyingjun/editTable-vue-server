var express = require('express');
var router = express.Router();
var connect=require("./mysql");

/* GET home page. */

router.get('/select', function(req, res, next) {
  var uid=req.query.uid;
  connect.query("select * from info where uid="+uid,function (err,result) {
      res.end(JSON.stringify(result));
  })

});

router.get('/add', function(req, res, next) {
    var name=req.query.name;
    var sex=req.query.sex;
    var uid=req.query.uid;
    connect.query("insert into info (name,sex,uid) values ('"+name+"','"+sex+"',"+uid+")",function (err,result) {
        if(result.affectedRows>0){
          res.end("ok")
        }else{
          res.end("err");
        }
    })

});

router.get("/edit",function (req,res) {
    var id=req.query.id
    connect.query("select * from info where id="+id,function (err,result) {
        res.end(JSON.stringify(result[0]));
    })
})

router.get("/editCon",function (req,res) {
    var name=req.query.name;
    var sex=req.query.sex;
    var id=req.query.id;
    connect.query(`update info set name='${name}',sex='${sex}' where id=${id}`,function (err,result) {
        if(result.affectedRows>0){
          res.end("ok")
        }else{
          res.end("err");
        }
    })
})

router.get("/del",function (req,res) {
    var id=req.query.id;
    connect.query("delete from info where id="+id,function (err,result) {
        if(result.affectedRows>0){
          res.end("ok")
        }else{
          res.end("err");
        }
    })
})


module.exports = router;
