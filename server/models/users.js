const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
  "userid": Number,
  "userName": String,
  "userPwd": Number,
  "orderList": Array,
  "addressList": Array,
  "carList": [{
    "productId": Number,
    "productName": String,
    "prodcutPrice": Number,
    "prodcutImg": String,
    "checked": Number,
    "productNum": Number,
  }],
})



module.exports = mongoose.model('User',userSchema)
