<template>
  <div class='h-full w-full bg-black text-white flex flex-col items-center font-sans'>
    <Header :greeting="this.greeting" :tagline="this.tagline" />   
    <DistractionForm @submit="saveDistraction" />
    <span class="mt-10"></span>
    <DistractionList :distractionList="this.distractionList" :oldFirst="this.oldFirst" @toggleSort="handleToggleSort" @clearAll="handleClearAll" @clearOne="handleClearOne" />
    <div class="absolute bottom-3 right-4" v-if="web">
      Add to Chrome
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import DistractionForm from "./components/DistractionForm.vue"
import DistractionList from "./components/DistractionList.vue"

export default {
  name: 'OnTask',
  components: {
    Header,
    DistractionForm,
    DistractionList,
  },
  data() {
    return {
      greeting: "Hey, what are you up to?",
      tagline: "Don't fall into a rabbit hole, postpone any distractions 'til later.",
      oldFirst: false,
      distractionList: [],
      web: !window.location.href.includes("extension")
    }
  },
  computed: {
    isDarkMode() {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
       return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    saveDistraction(newDistraction) {
      if (!this.oldFirst)
        this.distractionList.unshift(newDistraction)
      else
        this.distractionList.push(newDistraction)
      localStorage.distractionList = JSON.stringify(this.distractionList)
    },
    handleToggleSort(oldFirst) {
      this.oldFirst = oldFirst
      this.distractionList = this.distractionList.reverse()
    },
    handleClearAll() {
      this.distractionList = []
      localStorage.removeItem("distractionList");
    },
    handleClearOne(index) {
      this.distractionList.splice(index, 1)
      localStorage.distractionList = JSON.stringify(this.distractionList)
    }
  },
  mounted() {
    if (localStorage.distractionList)
      this.distractionList = JSON.parse(localStorage.distractionList)
      this.distractionList = this.distractionList.sort((a, b) => a.time - b.time)
      if (!this.oldFirst)
        this.distractionList = this.distractionList.reverse()
  },
}
</script>

