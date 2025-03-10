<script setup>
import ThemeToggle from "./components/ThemeToggle.vue";
import WordCard from "./components/WordCard.vue";
import Quiz from "./components/Quiz.vue";
import { ref } from "vue";

const currentView = ref("cards"); // 'cards' 或 'quiz'
</script>

<template>
  <div class="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
    <header class="container mx-auto flex justify-between items-center mb-8">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          TSMC 單字卡
        </h1>
        <nav class="flex gap-2">
          <button
            @click="currentView = 'cards'"
            :class="[
              'px-4 py-2 rounded-lg flex items-center',
              currentView === 'cards'
                ? 'bg-gray-800 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
            ]"
          >
            <span class="material-icons align-middle mr-1">style</span>
            <span>單字卡</span>
          </button>
          <button
            @click="currentView = 'quiz'"
            :class="[
              'px-4 py-2 rounded-lg flex items-center',
              currentView === 'quiz'
                ? 'bg-gray-800 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
            ]"
          >
            <span class="material-icons align-middle mr-1">quiz</span>
            <span>測驗</span>
          </button>
        </nav>
      </div>
      <ThemeToggle />
    </header>
    <main class="container mx-auto">
      <WordCard v-if="currentView === 'cards'" />
      <Quiz v-else />
    </main>
  </div>
</template>

<style scoped></style>
