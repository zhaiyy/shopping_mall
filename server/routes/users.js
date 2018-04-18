const express = require('express');
const router = express.Router();
const Users = require('../models/users');


router.get('/', function(req, res, next){
  res.send('respond with a resource')
})
router.post('/login',(req, res, next) => {
  const params = {
    userName:req.body.userName,
    userPwd:req.body.userPwd,
  };
  Users.findOne(params,  (err, doc) => {
    if(err || doc == null){
      res.json({
        status:'1',
        'msg':err?err:'账号密码错误'
      })
    }else{
      res.cookie("userid",doc.userid,{
          path:'/',
          maxAge:1000*60*60
        });
       // res.session.user = doc;
        res.json({
          status: '0',
          'msg': 'success',
          result:{
            "userName":doc.userName,
          }
        })
    }
  })
})
module.exports = router;

