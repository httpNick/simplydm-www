var Rcon = require('rcon');
var mongoose = require('mongoose');
var Q = require('q');
var Server = require('../models/Server');

var conn = new Rcon('178.62.87.33', 27015, '123');

var auth = false;

setInterval(function (argument) {
  conn.send('status')
}, 3000)

conn.on('auth', function() {
  console.log("Authed!");
  auth = true;
});

conn.on('response', function(str) {
  if (auth) {
    console.log(str);
    update(str.replace(/(?:\r\n|\r|\n)/g, ',').split(','))
  } else {
    console.log('Not authed');
  }
});

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
  data[0].players = str[6].slice(11, -8)
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
