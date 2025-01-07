import Quiz from "../Models/Quiz.js";
const generateCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    const existingQuiz = await Quiz.findOne({ code });
    exists = existingQuiz !== null;
  }
  return code;
};

export const generateQuiz = async (req, res) => {
  try {
    const {
      scheduledTime,
      quizName,
      quizDuration,
      timePerQuestion,
      questionShuffle,
      optionShuffle,
      questions,
      generator,
      numberOfQuestions,
      quizTitle,
    } = req.body;

    const code = await generateCode();
    const newQuiz = new Quiz({
      code,
      scheduledTime,
      quizName,
      quizDuration,
      timePerQuestion,
      questionShuffle,
      optionShuffle,
      questions,
      generator,
      numberOfQuestions,
      quizTitle,
    });

    const savedQuiz = await newQuiz.save();
    return res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not create quiz" });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { Code } = req.body;
    const data = await Quiz.findOne({ code: Code });
    if (!data) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};

export const getQuizes = async (req, res) => {
  try {
    const data = await Quiz.find({ generator: req.body.email });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { email, code, score } = req.body;
    const result = await Quiz.findOneAndUpdate(
      { code: code, "attemptedBy.email": { $ne: email } },
      {
        $addToSet: {
          attemptedBy: { email: email, correctAnswers: score },
        },
      },
      { new: true }
    );

    if (!result) {
      return res
        .status(201)
        .json({ message: "User has already attempted this quiz" });
    }

    return res.status(200).json({ message: "Quiz user added successfully" });
  } catch (error) {
    console.error("Error in updateQuiz:", error);
    return res.status(500).json({ message: "Could not fetch data" });
  }
};
