const express = require('express')
const router = express.Router()
const Users = require('../models/users')


router.get('/', function(req, res) {
  res.send('respond with a resource')
})
router.post('/login', (req, res) => {
  const params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }
  Users.findOne(params,  (err, doc) => {
    if (err || doc == null) {
      res.json({
        status: 1,
        'msg': err ? err : '账号密码错误'
      })
    } else {
      res.cookie('userid', doc.userid, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })
      res.cookie('userName', doc.userName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })
      // res.session.user = doc;
      res.json({
        status: 0,
        'msg': 'success',
        result: {
          'userName': doc.userName,
        }
      })
    }
  })
})
router.post('/logout', (req, res) => {
  res.cookie('userid', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: 0,
    'msg': 'success',
  })
})
router.post('/checkLogin', (req, res) => {
  if (req.cookies.userid) {
    res.json({
      status: 0,
      'msg': 'success',
      result: { userName: req.cookies.userName }
    })
  } else {
    res.json({
      status: 1,
      'msg': '未登录',
      result: ''
    })
  }
})

/* 查询用户购物车数据 */
router.get('/cartList', (req, res) => {
  const userid = req.cookies.userid
  Users.findOne({ userid: userid }, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        'msg': err
      })
    } else {
      if (doc) {
        res.json({
          status: 0,
          'msg': 'success',
          result: doc.carList
        })
      }
    }
  })
})
module.exports = router

