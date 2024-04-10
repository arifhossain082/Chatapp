const { Server } = require("socket.io");

const io = new Server({ cors: "http://127.0.0.1:5173/" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log('New Connection', socket.id)

  //listen to a connection
  socket.on("addNewUser", (userId)=>{
    !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({
        userId,
        socketId: socket.id,
    })
  io.emit("getOnlineUsers", onlineUsers)
  })
  //Send Message
  socket.on("sendMessage", (message)=>{
    socket.broadcast.emit("getMessage", message)
  })


  socket.on("disconnect", ()=>{
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })
});

io.listen(3000);