import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  PIN: {
    type: Number
  },
  type: {
    type: String,
    enum: ['Pharmacist', 'Admin', 'Patient', 'Doctor'],
    required: true,
  },
  socket: {
    type: String
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
