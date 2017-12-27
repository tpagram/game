var app = require('express')();
var path = require('path');
var serveStatic = require('serve-static');
var http = require('http').Server(app);
var io = require('socket.io')(http);

if (process.env.NODE_ENV == "production") {
  app.use(serveStatic(__dirname + "/dist"));
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('server started '+ port);
}

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('user_connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message', function(message){
    io.emit('message', message);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
