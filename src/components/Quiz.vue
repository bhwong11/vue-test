<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Option from './Option.vue';
import {questionIndexStore} from '../stores/index'
import { collection, doc, setDoc, getDoc,updateDoc } from "firebase/firestore"; 
import db from "../database/index"

defineProps<{ msg: string }>()

type TriviaData = {
  type: boolean
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  index?:number
}

type AnswerData = {
  answer:string | null,
  correct:boolean | null
}

const count = ref(0)
const triviaData = ref<TriviaData[]>([])
const allAnswersData = ref<AnswerData[]>([])

const getTrivia = () => fetch('https://opentdb.com/api.php?amount=10').then(
  res=>res.json()
).then(
  data=>{
    console.log(data)
    triviaData.value = data.results
    showScore.value = false
    questionIndexStore.currentQuestionIndex = 0
  }
)

const score = computed(()=>{
  return allAnswersData.value.reduce((all,next)=>all+(next.correct?1:0),0)
})

const showScore = ref(false)

const currentQuestion = computed(()=>{
  let question = triviaData.value[questionIndexStore.currentQuestionIndex]
  if(question) question.index = questionIndexStore.currentQuestionIndex
  return question
})

const currentQuestionOptions = computed(()=>{
  return [
    ...(currentQuestion.value?currentQuestion.value.incorrect_answers:[]),
    ...(currentQuestion.value?[currentQuestion.value.correct_answer]:[]),
  ].sort(() => Math.random() - 0.5)
})

const isLastQuestion = computed(()=>(questionIndexStore.currentQuestionIndex+1)>=triviaData.value.length)

const username = ref("")

const usernameData = computed({
  get:()=>{
    return username.value
  },
  set:(newValue)=>{
    username.value = newValue
  }
})

const currentSelectedOption = computed(()=>{
  return allAnswersData.value[questionIndexStore.currentQuestionIndex]?.answer
})

const moveToNextQuestion = ()=>{
  console.log('IS LASZT',isLastQuestion.value)
  if(isLastQuestion.value){
    showScore.value = true
    return
  }
  questionIndexStore.currentQuestionIndex++
}

const moveToLastQuestion = ()=>{
  if(questionIndexStore.currentQuestionIndex===0){
    return
  }
  questionIndexStore.currentQuestionIndex--
}

const setAnswer = (answer:string) => {
  allAnswersData.value[questionIndexStore.currentQuestionIndex].answer = answer ?? null
  
  const isCorrect = triviaData.value[questionIndexStore.currentQuestionIndex].correct_answer === answer
  allAnswersData.value[questionIndexStore.currentQuestionIndex].correct = isCorrect
}

const submitScore = async ()=>{
  console.log('SUBMITTING',username.value)
  const docRef = doc(db, "users", username.value);
  const docSnap = await getDoc(docRef);
  const existingUser = docSnap.data()
  console.log('docSnap!!',docSnap.data())
  console.log('score',existingUser?.score)
  if(existingUser){
    updateDoc(docRef,{
      score:existingUser.score+score
    })
    return
  }
  await setDoc(doc(db, "users", username.value), {
    username:username.value,
    score:score.value
  });
}


watch(triviaData, async (newTriviaData, oldTriviaData) => {
  console.log('OLD DATA',oldTriviaData)
  allAnswersData.value = newTriviaData.map(()=>({
      answer:null,
      correct:null
    }))
})


const countInc=()=>{
  console.log('count',count.value)
  count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    {{ allAnswersData }}
    {{ questionIndexStore.currentQuestionIndex }}
    <button type="button" @click="countInc">count is {{ count }}</button>
    <button type="button" @click="getTrivia">get questions/reset</button>
    <button type="button" @click="moveToNextQuestion">next question</button>
    <button type="button" @click="moveToLastQuestion">last question</button>
    <Option
      v-for="option in currentQuestionOptions"
      :option="option"
      :is-selected="currentSelectedOption===option"
      :correct="currentQuestion?.correct_answer===option"
      @answer-question="({answer})=>setAnswer(answer)"
    />
    <div>
      score:{{ score }}
      <label for="username">
        username
        <input id="username" v-model="usernameData"/>
      </label>
      <button type="button" @click="submitScore">Submit Score</button>
    </div>
    <div>
      {{ currentQuestion }}
    </div>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
