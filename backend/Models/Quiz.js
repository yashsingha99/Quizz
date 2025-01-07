import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
});

export const attemptSchema = new mongoose.Schema({
  email: { type: String, required: true },
  correctAnswers: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  code: { type: Number, required: true, unique: true },
  quizTitle: { type: String, required: true },
  quizDuration: { type: Number, required: true },
  timePerQuestion: { type: Number, default: 30 },
  questions: { type: [questionSchema], required: true },
  numberOfQuestions: { type: Number, required: true },
  shuffleQuestions: { type: Boolean, default: false },
  shuffleOptions: { type: Boolean, default: false },
  generator: { type: String, required: true },
  scheduledTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  attemptedBy: { type: [attemptSchema], default: [] },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
