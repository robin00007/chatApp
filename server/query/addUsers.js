import { User } from "../schema/userSchema.js";
const addUser = async ({ name, email, picture }) => {
  const user = new User({
    name,
    email,
    picture,
  });
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log("User already exists:", existingUser.name);
    } else {
      user
        .save()
        .then((savedUser) => {
          console.log("User saved successfully:", savedUser);
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
export { addUser };
