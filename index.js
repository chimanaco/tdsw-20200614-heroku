const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5500;
var names = ['pan', 'pan_fine', 'tilt', 'tilt_fine', 'speed', 'dimmer', 'red', 'green', 'blue', 'white', 'colour_macrro']

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  var len = names.length;
  for (i = 0; i < len; i++) {
    addSocketOn(socket, names[i]);
  }
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

function addSocketOn(socket, name) {
  socket.on(name, (data) => {
    console.log(name);
    io.emit(name, { 'id': data.id, 'val': data.val });
  });
}
