<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- 測驗模式選擇 -->
    <div v-if="!isActive" class="flex flex-col items-center gap-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        選擇測驗模式
      </h2>
      <!-- 翻譯方向選擇 -->
      <div class="flex gap-4 mb-4">
        <button
          v-for="mode in quizModes"
          :key="mode.value"
          @click="selectedMode = mode.value"
          :class="[
            'px-6 py-3 rounded-lg transition-colors',
            selectedMode === mode.value
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          ]"
        >
          {{ mode.label }}
        </button>
      </div>
      <!-- 測驗類型選擇 -->
      <div class="flex gap-4 mb-6">
        <button
          v-for="type in quizTypes"
          :key="type.value"
          @click="selectedType = type.value"
          :class="[
            'px-6 py-3 rounded-lg transition-colors flex items-center gap-2',
            selectedType === type.value
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          ]"
        >
          <span class="material-icons">{{ type.icon }}</span>
          {{ type.label }}
        </button>
      </div>
      <!-- 開始按鈕 -->
      <button
        @click="startQuiz(selectedMode, selectedType)"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        開始測驗
      </button>
    </div>

    <!-- 測驗介面 -->
    <div v-else class="flex flex-col items-center gap-6">
      <!-- 進度和分數 -->
      <div class="w-full flex justify-between items-center mb-4">
        <div class="text-lg text-gray-900 dark:text-white">
          得分：{{ score }}/{{ totalQuestions }}
        </div>
        <div class="text-lg text-gray-900 dark:text-white">
          正確率：{{ getProgress }}%
        </div>
        <button
          @click="endQuiz"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
        >
          結束測驗
        </button>
      </div>

      <!-- 問題卡片 -->
      <div class="w-full bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div class="text-center">
          <h3 class="text-3xl font-bold text-white mb-2">
            {{ currentQuestion?.question }}
          </h3>
          <span class="text-gray-400">{{ currentQuestion?.type }}</span>
        </div>
      </div>

      <!-- 選擇題選項 -->
      <div v-if="quizType === 'choice'" class="w-full grid grid-cols-2 gap-4">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="selectAnswer(option)"
          :class="[
            'p-4 text-lg font-medium rounded-lg transition-colors duration-200',
            'bg-gray-700 text-white hover:bg-gray-600',
          ]"
        >
          {{ option }}
        </button>
      </div>

      <!-- 輸入框 -->
      <div v-else class="w-full flex flex-col gap-4">
        <input
          v-model="userInput"
          type="text"
          :placeholder="
            quizMode === 'en-zh'
              ? '請輸入中文翻譯'
              : 'Please input English translation'
          "
          class="w-full p-4 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="submitAnswer"
        />
        <button
          @click="submitAnswer"
          class="w-full p-4 text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500"
        >
          提交答案
        </button>
      </div>
    </div>

    <!-- 答案回饋 -->
    <div
      v-if="showFeedback"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      @click="hideFeedback"
      tabindex="0"
      @keyup.enter="hideFeedback"
      @keyup.space="hideFeedback"
    >
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-xl text-center"
        @click.stop
      >
        <span class="material-icons text-6xl mb-4" :class="feedbackIcon.class">
          {{ feedbackIcon.name }}
        </span>
        <p
          class="text-xl font-bold mb-2 text-gray-900 dark:text-white"
          :class="feedbackIcon.class"
        >
          {{ isLastAnswerCorrect ? "答對了！" : "答錯了！" }}
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          正確答案：{{ currentQuestion?.answer }}
        </p>
        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          按 Enter 或空白鍵繼續
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useQuiz } from "../composables/useQuiz";

const {
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
} = useQuiz();

const showFeedback = ref(false);
const isLastAnswerCorrect = ref(false);
const selectedMode = ref("en-zh");
const selectedType = ref("choice");

const quizModes = [
  { value: "en-zh", label: "英翻中" },
  { value: "zh-en", label: "中翻英" },
];

const quizTypes = [
  { value: "choice", label: "選擇題", icon: "check_box" },
  { value: "input", label: "輸入題", icon: "edit" },
];

const feedbackIcon = computed(() => ({
  name: isLastAnswerCorrect.value ? "check_circle" : "cancel",
  class: isLastAnswerCorrect.value ? "text-green-500" : "text-red-500",
}));

const selectAnswer = (answer) => {
  isLastAnswerCorrect.value = checkAnswer(answer);
  showFeedback.value = true;
};

const submitAnswer = () => {
  if (!userInput.value.trim()) return;
  isLastAnswerCorrect.value = checkInputAnswer();
  showFeedback.value = true;
};

const hideFeedback = () => {
  showFeedback.value = false;
  nextQuestion();
};

// 全局鍵盤事件處理
const handleKeydown = (e) => {
  if (
    showFeedback.value &&
    (e.key === "Enter" || e.key === "ArrowRight" || e.key === "ArrowDown")
  ) {
    hideFeedback();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
