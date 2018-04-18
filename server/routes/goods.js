const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Goods = require('../models/goods')
const Users = require('../models/users');


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

router.get('/', function(req, res, next){
  const page = parseInt(req.param('page'))
  const pageSize = parseInt(req.param('pageSize'))
  const priceLevel = req.param('priceChecked')
  const skip = (page-1) * pageSize
  const sort = req.param('sort')
  const params ={}
  if(priceLevel){
   const priceObj = JSON.parse(priceLevel)
    params['prodcutPrice'] = {
      $gt:parseFloat(priceObj.startPrice),
      $lte:parseFloat(priceObj.endPrice),
    }
  }
  const goodModel = Goods.find(params).skip(skip).limit(pageSize);
  goodModel.sort(sort)
  goodModel.exec({},(err,doc)=>{
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

/*加入到购物车*/

router.post('/addCart', function(req, res, next){
  const productId = req.body.productId;
    Users.findOne({'userid':100077},  (err, userDoc) => {
    if(err){
      res.json({
        status:'1',
        'msg':err.message
      })
    }else{
      if(userDoc){
        let isExist = false;
        userDoc.carList.forEach((item)=>{
          if(item.productId == productId){
            item.productNum ++ ;
            isExist = true;
            userDoc.save((err2,doc2)=> {
              if (err2) {
                res.json({
                  status: '1',
                  'msg': err2.message
                })
              } else {
                res.json({
                  status: '0',
                  'msg': '',
                  'result': 'success',
                })
              }
            })
          }
        })
        if(isExist){return}
        Goods.findOne({'productId':productId},  (err1, good) => {
          if(err1) {
            res.json({
              status: '1',
              'msg': err1.message
            })
          }else{
            if(good){
              let cartData = {
                "productId": good.productId,
                "productName": good.productName,
                "prodcutPrice": good.prodcutPrice,
                "prodcutImg": good.prodcutImg,
                "checked": 1,
                "productNum": 1,
              };
              userDoc.carList.push(cartData);
              userDoc.save((err2,doc2)=>{
                if(err2) {
                  res.json({
                    status: '1',
                    'msg': err2.message
                  })
                }else{
                  res.json({
                    status: '0',
                    'msg': '',
                    'result': 'success',
                  })
                }
              })

            }
          }
        })
      }
    }
  })
})

module.exports = router;

