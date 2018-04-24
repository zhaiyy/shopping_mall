const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const goods = require('./goods')
const users = require('./users')
/* 链接数据库 */
mongoose.connect('mongodb://127.0.0.1:27017/goods')

mongoose.connection.on('connected', () => {
  console.log('mongodb connect success')
})
mongoose.connection.on('error', () => {
  console.log('mongodb connect fail')
})

mongoose.connection.on('disconnected', () => {
  console.log('mongodb connect disconnected')
})
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express very good ' })
})

module.exports = {
  'index': router,
  goods,
  users,
}
