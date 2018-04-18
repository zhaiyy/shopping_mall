const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  "productId": Number,
  "productName": String,
  "prodcutPrice": Number,
  "prodcutImg": String
})

module.exports = mongoose.model('Good',productSchema)
