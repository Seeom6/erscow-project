const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("./Routes/messagesRoute");
const userRoute = require("./Routes/UserRoute");
const app = express();
const socket = require("socket.io");
const compression = require("compression")
require("dotenv").config();

app.use(cors());
app.options('*',cors());
app.use(compression())
app.use(express.json());



mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/api/users", userRoute);
app.use("/api/messages", messageRoutes);
app.get("*" , (req, res) => {res.status(404).json("not found");})
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT || 8001}`)
);
const io = socket(server, 
   {
   cors: {
     origin: "http://erscow.com",
     credentials: true,
   },
 });

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});