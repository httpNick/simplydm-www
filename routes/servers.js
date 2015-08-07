var express = require('express')

var servers = require('../servers.json');
var router = express.Router()
var Rcon = require('srcds-rcon');
var mongoose = require('mongoose');
var async = require('async');
var Server = require('../models/Server.js');
var ping = require('ping');

// var s = new Rcon('46.101.5.97:27015', '56U4.yGL!A9597V');

/* TODO: Servers have own sub-url, example: /servers/uk-1
 * Shows currently connected players, map, some stats
 * Button which allows users to connect to the server
 */

// router.get('/create', function(req, res) {
//   res.render('servers/create.jade')
// })

// router.post('/create', function(req, res) {
//   console.log(req.body);
//   Server.findOne({
//     'ip': req.body.ip
//   }, function(err, doc) {
//     console.log(doc);
//     if (!doc) {
//       //Start creating entry
//       var newServer = new Server({
//         ip: req.body.ip,
//         port: req.body.port,
//         hostname: req.body.hostname,
//         map: '',
//         online: false
//       })
//
//       newServer.save(function(err) {
//           if (err) {
//             console.log('Error creating server');
//           } else {
//             console.log('Server added to database');
//             res.end('Server added to the database')
//           }
//         })
//         //End creating entry
//     } else {
//       res.end('Server already exists in database')
//     }
//   })
// })

/*
 * User Server Model
 * 1. query server data on GET request
 * 2. Push updated data to server
 * 2. Render updated data to view
 */
router.get('/', function(req, res) {
  // var servers = {}
  // var servers = {
  //   1: {
  //     hostname: 'uk-1',  --- Called from DB
  //     ip: '',        --- Called from DB
  //     port: '',      --- Called from DB
  //     map: '',       --- Called from RCON
  //     online: '',    --- Called from RCON
  //     players: ''    --- Called from RCON
  //   },
  //   2 :{
  //     etc...
  //   }
  // }


  /*
   * Database Query logic:
   * Gets: hostname, ip, port
   */

  //Get IP, hostname, and port
  // Server.find({}, function(err, doc) {
  //   if (!err) {
  //     //  console.log(doc);
  //     for (var i = 0; i < doc.length; i++) {
  //       servers[i] = doc[i]
  //         // Ping servers to get alive status
  //       ping.promise.probe(doc[i].ip)
  //         .then(function(res) {
  //           if (res.alive) {
  //             servers[i].online = true
  //           } else {
  //             servers[i].online = false
  //           }
  //         })
  //     }
  //   } else {
  //     throw err
  //   }
  // })

  //Rendering:
  res.render('servers/index.jade', {
    servers: servers
  })
  /*
   * RCON query logic:
   * Gets: map and players online
   */
})

module.exports = router
