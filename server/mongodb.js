import chalk from "chalk";
import mongoose from "mongoose";
import "dotenv/config";
const connectDb = async () => {
  const dbUrl = `mongodb+srv://testUser123:${process.env.MONGDB_PASSWORD}@chatapp.4rh7nop.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(dbUrl);
    console.log(chalk.yellow("db connected"));
  } catch (err) {
    console.log(chalk.red("db connection failed"));
  }
};
export default connectDb;
