<template>
  <main class="app">
    <h1>The Quiz</h1>
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{ currentQuestion.question }}</span>
        <span class="score">Score {{ computedScore }} / {{ questions.length }}</span>
      </div>
      <div class="options">
        <label
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :class="getOptionClasses(index)"
        >
          <input
            type="radio"
            :id="`option-${index}`"
            :value="index"
            v-model="currentQuestion.selected"
            @change="setAnswer(index)"
            :disabled="currentQuestion.selected !== null"
          />
          <span>{{ option }}</span>
        </label>
      </div>
      <button @click="nextQuestion" :disabled="currentQuestion.selected === null">
        {{ buttonLabel }}
      </button>
    </section>

    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your score is {{ computedScore }} / {{ questions.length }}</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { questions as originalQuestions } from "./questions";

const questions = reactive(originalQuestions);

const quizCompleted = ref(false);
const currentQuestionIndex = ref(0);

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const computedScore = computed(
  () => questions.filter((q) => q.selected === q.answer).length
);
const buttonLabel = computed(() =>
  currentQuestionIndex.value === questions.length - 1
    ? "Finish"
    : currentQuestion.value.selected === null
    ? "Select an option"
    : "Next Question"
);

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  } else {
    quizCompleted.value = true;
  }
};

const setAnswer = (index: number) => {
  questions[currentQuestionIndex.value].selected = index;
};

const getOptionClasses = (index: number) => {
  const question = currentQuestion.value;
  const isSelected = question.selected === index;
  const isCorrect =
    question.answer !== undefined && question.selected === question.answer;

  return {
    option: true,
    correct: isSelected && isCorrect,
    wrong: isSelected && !isCorrect,
    disabled: question.selected !== null && !isSelected,
  };
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 01.25rem;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}

.quiz-info .score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  display: block;
  padding: 1rem;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
</style>
