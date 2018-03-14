const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Goods = require('../models/goods')


/*链接数据库*/
mongoose.connect('mongodb://127.0.0.1:27017/goods')

mongoose.connection.on('connected',()=>{
  console.log('mongodb connect success')
})
mongoose.connection.on('error',()=>{
  console.log('mongodb connect fail')
})

mongoose.connection.on('disconnected',()=>{
  console.log('mongodb connect disconnected')
})


router.get('/', function(res, res, next){
  Goods.find({},(err,doc)=>{
      if(err){
        res.json({
          status:'1',
          'msg':err.message
        })
      }else{
        res.json({
          status:'0',
          'msg':'',
          result:{
            count:doc.length,
            data:doc
          }
        })
      }
    }
  )
})

module.exports = router;

