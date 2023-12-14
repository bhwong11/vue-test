<script setup lang="ts">
import db from "../database";
import { computed, ref } from "vue";
import { collection, query, getDocs,where } from "firebase/firestore"; 

type User = {
  username:string,
  score:number
}
const users = ref<User[]>([])

const q = query(collection(db, "users"), where("username", '!=', null));
const getUserScores = async () =>{
  const querySnapshot = await getDocs(q);
  users.value = []
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  const user = doc.data() as User
  users.value = [...users.value,user]
})
}
getUserScores()

const sortedUsersByScore = computed(()=>{
  return users.value.sort((a,b)=>a.score>b.score?-1:1)
})
</script>

<template>
  <h2>SCORES:</h2>
  <div
  v-for="(user,index) in sortedUsersByScore"
  :key="`${user.username}-${index}`"
  >
    username: {{ user.username }} total cumlative score: {{ user.score }}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

</style>
