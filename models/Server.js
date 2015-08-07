var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID

var ServerSchema = new Schema({
  ip: String,
  port: Number,
  hostname: String,
  map: String,
  online: Boolean
})

mongoose.model('Server', ServerSchema)

module.exports = mongoose.model('Server')
