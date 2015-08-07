var mongoose = require('mongoose');
var config = require('../config.js')

mongoose.connect('mongodb://'+config.db.domain+':27017/SimplyDM')

var userSchema = new mongoose.Schema({
  displayName: String,
  identifier: String,
  steamid: String,
  avatar: String,
  clientToken: String,
  subscriber: Boolean
})

var User = mongoose.model('User', userSchema)

module.exports = User
