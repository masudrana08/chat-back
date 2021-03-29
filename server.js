

const app = require('express')();
const httpServer = require('http').createServer(app);
const {addUser, removeUser} = require('./handle/users')

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });



io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callback)=>{
    const {user, error} = addUser(socket.id, name, room)
    if (error){
        callback(error)
    }
    socket.join(room)
    socket.emit('message', {user: user, text:`welcome ${name} to ${room}`})
    socket.broadcast.to(room).emit('message', {user: user, text:`${name} joined to the ${room}`})
    socket.on('disconnect', ()=>{
      socket.broadcast.to(room).emit('message', {user: user, text:`Disconnected ${name} from ${room}`})
      const users= removeUser(socket.id)
      callback()
    })
    socket.on('message', (msg)=>{
      console.log(msg)
      socket.emit('message', {user: name, text:msg})
      socket.broadcast.to(room).emit('message', {user: name, text:msg})
      
    })
    
  })
  

    
});

httpServer.listen(4000, () => {
  console.log('listening on *:3000');
});