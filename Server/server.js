const http = require('http');
const express = require('express');

const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static form ${clientPath}`);

app.use(express.static(clientPath));


const server = http.createServer(app);


const io = socketio(server);

io.on('connection', (sock) => {
  console.log("Someone connected");
  sock.emit('message', 'Hi you are connected');

  sock.on('message', (text)  => {
    io.emit('message', text);
  });

});


server.on('error', (err) =>{
  console.log("Server Error:" , err);
});


server.listen(" https://shielded-lowlands-10094.herokuapp.com/", () => {
  console.log(("RPS Started on 8080"));
});
