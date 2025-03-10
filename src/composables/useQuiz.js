import { ref, computed } from "vue";
import { vocabulary } from "../core/vocabulary";

export const useQuiz = () => {
  const quizMode = ref("en-zh"); // 'en-zh' 或 'zh-en'
  const quizType = ref("choice"); // 'choice' 或 'input'
  const currentQuestion = ref(null);
  const options = ref([]);
  const score = ref(0);
  const totalQuestions = ref(0);
  const isActive = ref(false);
  const userInput = ref("");

  const generateOptions = (correctAnswer, mode) => {
    // 從詞彙表中隨機選擇3個錯誤選項
    const wrongOptions = [];
    const usedIndices = new Set();

    while (wrongOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * vocabulary.length);
      const word = vocabulary[randomIndex];

      if (
        !usedIndices.has(randomIndex) &&
        (mode === "en-zh"
          ? word.chinese !== correctAnswer
          : word.english !== correctAnswer)
      ) {
        wrongOptions.push(mode === "en-zh" ? word.chinese : word.english);
        usedIndices.add(randomIndex);
      }
    }

    // 將正確答案加入選項並打亂順序
    const allOptions = [...wrongOptions, correctAnswer];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const startQuiz = (mode = "en-zh", type = "choice") => {
    quizMode.value = mode;
    quizType.value = type;
    score.value = 0;
    totalQuestions.value = 0;
    isActive.value = true;
    nextQuestion();
  };

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const word = vocabulary[randomIndex];
    userInput.value = "";

    currentQuestion.value = {
      question: quizMode.value === "en-zh" ? word.english : word.chinese,
      answer: quizMode.value === "en-zh" ? word.chinese : word.english,
      type: word.type,
    };

    if (quizType.value === "choice") {
      options.value = generateOptions(
        quizMode.value === "en-zh" ? word.chinese : word.english,
        quizMode.value
      );
    }
  };

  const checkAnswer = (selectedAnswer) => {
    totalQuestions.value++;
    const isCorrect = selectedAnswer === currentQuestion.value.answer;
    if (isCorrect) {
      score.value++;
    }
    return isCorrect;
  };

  const checkInputAnswer = () => {
    totalQuestions.value++;
    const isCorrect =
      userInput.value.trim().toLowerCase() ===
      currentQuestion.value.answer.toLowerCase();
    if (isCorrect) {
      score.value++;
    }
    return isCorrect;
  };

  const getProgress = computed(() => {
    return totalQuestions.value === 0
      ? 0
      : Math.round((score.value / totalQuestions.value) * 100);
  });

  const endQuiz = () => {
    isActive.value = false;
  };

  return {
    quizMode,
    quizType,
    currentQuestion,
    options,
    score,
    totalQuestions,
    isActive,
    userInput,
    startQuiz,
    checkAnswer,
    checkInputAnswer,
    nextQuestion,
    getProgress,
    endQuiz,
  };
};
