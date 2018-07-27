const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KeywordSchema = new Schema({
  NAME : {type : String}
})
mongoose.model('Keyword', KeywordSchema)
