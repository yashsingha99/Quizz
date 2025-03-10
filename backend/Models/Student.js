import mongoose from "mongoose";

export const quizSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  examiner: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    default: "Random quiz",
  },
});

export const userSchema = new mongoose.Schema({
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
    default: 0,
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
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  collegeRollNo: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
    trim: true,
  },
  quizzesAttended: [quizSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Student", userSchema);

export default User;