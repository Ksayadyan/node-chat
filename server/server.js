const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('User is connected');
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message)
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });
})





server.listen(port,()=>{
  console.log('Server is up on port 3000');
})
