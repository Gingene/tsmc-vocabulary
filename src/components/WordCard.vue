<template>
  <div class="flex flex-col items-center gap-8">
    <div class="w-full max-w-lg aspect-[3/2] perspective-1000" @click="flip">
      <div
        class="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d"
        :class="{ 'rotate-y-180': isFlipped }"
      >
        <!-- 正面 -->
        <div
          class="absolute w-full h-full bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center backface-hidden"
        >
          <span class="text-4xl font-bold mb-4 text-white">{{
            currentWord.english
          }}</span>
          <span class="text-gray-400">{{ currentWord.type }}</span>
        </div>

        <!-- 背面 -->
        <div
          class="absolute w-full h-full bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180"
        >
          <span class="text-4xl font-bold text-white">{{
            currentWord.chinese
          }}</span>
        </div>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <div class="flex items-center gap-4">
      <button
        @click="previous"
        class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
      >
        <span class="material-icons">arrow_back</span>
      </button>
      <button
        @click="getRandomWord"
        class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
      >
        <span class="material-icons">shuffle</span>
      </button>
      <button
        @click="next"
        class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
      >
        <span class="material-icons">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useVocabulary } from "../composables/useVocabulary";

const { currentWord, isFlipped, next, previous, flip, getRandomWord } =
  useVocabulary();
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
