const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  ID : {unique : true, type : String},
  NAME : {type : String},
  STATUS : {type : String},
  PRICE : {type : Number},
  IMAGE : {type : String},
  IMAGE1 : {type : String},
  IMAGE2 : {type : String},
  IMAGE3 : {type : String},
  IMAGE5 : {type : String},
  IMAGE6 : {type : String},
  IMAGE7 : {type : String},
  IMAGE8 : {type : String},
  IMAGE9 : {type : String},
  NUM : {type : Number}
})
mongoose.model('Order', orderSchema)
