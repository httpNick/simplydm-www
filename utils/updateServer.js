var Rcon = require('rcon');
var mongoose = require('mongoose');
var Q = require('q');
var Server = require('../models/Server');

var conn = new Rcon('178.62.87.33', 27015, 'TO BE SET UP WITH CONFIG');

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
    update(str.replace(/(?:\r\n|\r|\n)/g, ',').split(','))
  } else {
    console.log('Not authed');
  }
});

conn.connect();

var data = []

function update(str) {
  newData = {hostname : '', map : '', players : 0};
  newData.hostname = str[0].slice(10);
  newData.map = str[5].slice(10);
  newData.players = parseInt(str[6]
    .match(/(\b\d+(?:[\.,]\d+)?\b(?!(?:[\.,]\d+)|(?:\s*(?:%|percent))))/));
  data.push(newData);
  console.log(data);
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
