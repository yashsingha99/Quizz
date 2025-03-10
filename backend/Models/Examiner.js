import mongoose from "mongoose";

const examinerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: Number,
    default: 1,
    required: true,
  },
  photo: {
    type: String,
    default: "default",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  section:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
  }],
  role:{
    type: String,
    default: "teacher"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Examiner", examinerSchema);

export default User;
