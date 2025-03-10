<template>
  <div class="flex items-center gap-2">
    <button
      v-for="option in themeOptions"
      :key="option.value"
      @click="updateTheme(option.value)"
      :class="[
        'p-2 rounded-lg',
        theme === option.value ? 'bg-gray-200 dark:bg-gray-700' : '',
      ]"
    >
      <span class="material-icons text-blue-400">{{ option.icon }}</span>
    </button>
  </div>
</template>

<script setup>
import { useTheme } from "../composables/useTheme";

const { theme, updateTheme } = useTheme();

const themeOptions = [
  { value: "light", icon: "light_mode" },
  { value: "dark", icon: "dark_mode" },
  { value: "system", icon: "settings_suggest" },
];
</script>
