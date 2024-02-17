import express from "express";
import chalk from "chalk";
import cors from "cors";
import "dotenv/config";
import connectDb from "./mongodb.js";
import socketServer from "./socket.js";
import homeRoute from "./routes/homeRoute.js";
import userRoute from "./routes/userRoute.js";

export const app = express();
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
app.get("/", homeRoute);
app.get("/api/users", userRoute);

//database connection with mongoose ///////////////

await connectDb();

//socket connection ///////////////
export const activeUsers = {};
socketServer();
