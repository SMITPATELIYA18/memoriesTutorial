import Mongoose from "mongoose";

const userSchema = Mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default Mongoose.model("User", userSchema);
