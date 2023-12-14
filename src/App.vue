<script setup lang="ts">
import Quiz from './components/Quiz.vue'
import Home from './components/Home.vue'
import Scores from './components/Scores.vue'
import { ref } from 'vue'
import { computed } from '@vue/reactivity'

const routes:{[key: string]:any} ={
  '/':Home,
  '/quiz':Quiz,
  '/scores':Scores
}

const currentPath = ref(window.location.pathname)

window.addEventListener('hashchange',()=>{
  currentPath.value = window.location.pathname
})

const currentView = computed(()=>{
  return routes[currentPath.value || '/']
})

</script>

<template>
  <component :is="currentView" />
  <div v-if="!currentView">
    <h2>404 not found</h2>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
