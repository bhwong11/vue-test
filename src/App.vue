<script setup lang="ts">
import Quiz from './components/Quiz.vue'
import Home from './components/Home.vue'
import Scores from './components/Scores.vue'
import { ref,onUpdated } from 'vue'
import { computed } from '@vue/reactivity'

const routes:{[key: string]:any} ={
  '/':Home,
  '/quiz':Quiz,
  '/scores':Scores
}

const renders = ref(0)
onUpdated(()=>{
  renders.value++
  console.log('updated!! parent',renders.value)
})

const currentPath = ref(window.location.pathname)

const testValue = ref('')

window.addEventListener('hashchange',()=>{
  currentPath.value = window.location.pathname
})

const currentView = computed(()=>{
  return routes[currentPath.value || '/']
})

</script>

<template>
  <ul class="nav">
    <li><a href="/">home</a></li>
    <li><a href="/quiz">quiz</a></li>
    <li><a href="/scores">scores</a></li>
  </ul>
  <component :is="currentView" />
  <div v-if="!currentView">
    <h2>404 not found</h2>
  </div>
  <label>
    test
  <input v-model="testValue"/>
  </label>
</template>

<style scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap:1rem;
  list-style-type: none;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
