import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import "dotenv/config";

const app = express();
//// socket programming //////////////
const server = createServer(app);
const io = new Server(server);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

///// listening to the port ///////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
/////// routes ///////////////
app.get("/", (req, res) => {
  res.send("hello world");
});

//database connection with mongoose ///////////////
const dbUrl = `mongodb+srv://testUser123:${process.env.MONGDB_PASSWORD}@chatapp.4rh7nop.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log(chalk.yellow("db connected"));
  } catch (err) {
    console.log(chalk.red("db connection failed"));
  }
}
connect();

io.on("connection", (socket) => {
  //Added if the recipient is not in user communications list, add them
  console.log("a user connected");
  //TODO: complete this functionality by add new message feature in frontend
  socket.on("startMessage", ({ sender, recipient, token, senderEmail }) => {
    startMessage(sender, token, recipient);
  });
  socket.on("login", () => {
    console.log("user logged in");
    socket.emit("isLoggedIn", "robin");
  });

  //emits on sendMessage from frontend
  socket.on("sendMessage", ({ sender, recipient, token, message }) => {
    createMessage(sender, token, recipient, message).then((res) => {
      io.emit("message", res);
    });
  });
});
