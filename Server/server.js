const http = require('http');
const express = require('express');

const app = express();

const io = require("socket.io")(app, {
  cors: {
    origin: "https://practical-swartz-1e6fb8.netlify.app",
    methods: ["GET", "POST"]
  }
});

const clientPath = `${__dirname}/../client`;
console.log(`Serving static form ${clientPath}`);

app.use(express.static(clientPath));


const server = http.createServer(app);




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
