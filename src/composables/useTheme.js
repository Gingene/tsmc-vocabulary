import { ref, onMounted, watch } from "vue";

export const useTheme = () => {
  const theme = ref("system");

  const updateTheme = (newTheme) => {
    if (newTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    theme.value = newTheme;
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    updateTheme(savedTheme);
  });

  watch(theme, (newTheme) => {
    localStorage.setItem("theme", newTheme);
  });

  return {
    theme,
    updateTheme,
  };
};
