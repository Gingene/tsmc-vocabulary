import { ref, computed } from "vue";
import { vocabulary } from "../core/vocabulary";

export const useVocabulary = () => {
  const words = ref(vocabulary);
  const currentIndex = ref(0);
  const isFlipped = ref(false);

  const currentWord = computed(() => words.value[currentIndex.value]);

  const next = () => {
    isFlipped.value = false;
    currentIndex.value = (currentIndex.value + 1) % words.value.length;
  };

  const previous = () => {
    isFlipped.value = false;
    currentIndex.value =
      currentIndex.value === 0
        ? words.value.length - 1
        : currentIndex.value - 1;
  };

  const flip = () => {
    isFlipped.value = !isFlipped.value;
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.value.length);
    currentIndex.value = randomIndex;
    isFlipped.value = false;
    return words.value[randomIndex];
  };

  return {
    words,
    currentWord,
    isFlipped,
    next,
    previous,
    flip,
    getRandomWord,
  };
};
