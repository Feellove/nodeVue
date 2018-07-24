const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  ID : {unique : true, type : String},
  NAME : {type : String},
  PRICE : {type : Number},
  IMAGE : {type : String},
  NUM : {type : Number}
})
mongoose.model('Cart', cartSchema)
