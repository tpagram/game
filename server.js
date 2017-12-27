var app = require('express')();
var path = require('path');
var serveStatic = require('serve-static');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

if (process.env.NODE_ENV == "production") {
  app.use(serveStatic(__dirname + "/dist"));
  console.log('serving /dist on ' + port);
}

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('user_connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message', function(sender, message){
    io.emit('message', sender, message);
  });

});

http.listen(port, function(){
  console.log('listening on ' + port);
});

module.exports = app;
