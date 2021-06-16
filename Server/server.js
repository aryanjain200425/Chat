const http = require('http');
const express = require('express');

const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));


const server = http.createServer(app);


const io = socketio(server, {
  cors: {
    origin: "https://practical-swartz-1e6fb8.netlify.app",
    methods: ["GET", "POST"]
  }
});

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


  server.listen(8080, () => {
    console.log(("RPS Started on 8080"));
  });
