import { User } from "../schema/userSchema.js";
const userRoute = (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
export default userRoute;
