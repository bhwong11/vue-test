<script setup lang="ts">
import {questionIndexStore} from '../stores/index'

const props = defineProps<{ 
  option: string, 
  correct:boolean,
  isSelected:boolean
  key:string
}>()

const emit = defineEmits({
  answerQuestion(payload: { answer: string, correct: boolean, questionIndex:number }) {
    return !!payload.answer
  }
})
const emitAnswer = ()=>{
  emit('answerQuestion',{
    answer:props.option,
    questionIndex:questionIndexStore.currentQuestionIndex,
    correct:props.correct
  })
}
</script>

<template>
  <div :class="{'border-green':isSelected,'border-black':!isSelected}" :key="props.key" @click="emitAnswer">
    {{ option }}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.border-green{
  border: 2px solid greenyellow;
}
.border-black{
  border: 2px solid black;
}
</style>
