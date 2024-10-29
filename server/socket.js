import chalk from "chalk";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";
import { app } from "./index.js";
import { addUser } from "./query/addUsers.js";

let activeUsers = {};
const socketServer = () => {
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("login", (data) => {
      console.log("user logged in : ", data.name);
      const { name, email, picture, ...rest } = data;
      addUser({ name, email, picture });
      activeUsers[name] = socket.id;
      console.log("Active Users ", activeUsers);
    });
    socket.on("chat", ({ user, chat, owner }) => {
      const socketId = activeUsers[user.name];
      if (socketId) {
        console.log(socketId);
        io.to(socketId).emit("recieve message", {
          name: owner,
          chat: chat,
          owner: user.name,
        });
      }
    });
    socket.on("disconnect", () => {
      console.log(chalk.red("user disconnected"));
    });
  });

  io.listen(process.env.SOCKET_PORT, () => {
    console.log("socket port is listening on ", process.env.SOCKET_PORT);
  });
};
export default socketServer;
