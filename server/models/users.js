const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  'userid': Number,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'addressList': [{
    'addressId': Number,
    'userName': String,
    'streetName': String,
    'postCode': Number,
    'tel': String,
    'isDefault': Boolean,
  }],
  'carList': [{
    'productId': Number,
    'productName': String,
    'prodcutPrice': Number,
    'prodcutImg': String,
    'checked': Number,
    'productNum': Number,
  }],
})



module.exports = mongoose.model('User', userSchema)
