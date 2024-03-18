const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");

const userRouter = require("./routes/userRouter");
const customError = require("./controllers/errorController");
const msgRouter = require("./routes/messagesRouter");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/messages", msgRouter);
app.use(customError);

mongoose.connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log('Successfully connected to the database...');
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server started on Port ${process.env.PORT}..`);
      const io = socket(server, {
        cors: {
          origin: "http://localhost:3000",
          credentials: true
        }
      });

      const onlineUsers = new Map();

      io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
            io.to(sendUserSocket).emit("msg-receive", data.message);
          }
        });
      });
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });
