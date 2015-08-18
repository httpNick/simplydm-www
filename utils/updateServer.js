var Rcon = require('rcon');
var mongoose = require('mongoose');
var Server = require('../models/Server');

var conn = new Rcon('46.101.5.97', 27015, 'REDACTED');

setInterval(function (argument) {
  conn.send('status')
}, 3000)

conn.on('auth', function() {
  console.log("Authed!");
}).on('response', function(str) {
  update(str.replace(/(?:\r\n|\r|\n)/g, ',').split(','))
})

conn.connect();

var data = {
  '0': {
    'hostname' : '',
    'map' : '',
    'players' : 0
  },
}

function update(str) {
  data[0].hostname = str[0].slice(11, -1)
  data[0].map = str[5].slice(11, -1)
  data[1].players = str[6].slice(11, -8)
  console.log(data);
  // var hostname  = data[0].toString().slice(11, -1)
  // var map       = JSON.stringify(data[5]).slice(11, -1)
  // var players   = JSON.stringify(data[6]).slice(11, -8)
  // console.log(hostname);
  // console.log(map);
  // console.log(players);
}
//update server stats
Server.findOne({
    'ip': 'test'
  },
  function(err, doc) {
    var newServer = new Server({
      map: '',
      players: 6
    }).save()
})
