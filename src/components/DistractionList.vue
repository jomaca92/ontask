<template>
    <div v-if="distractionList.length" class="flex flex-row justify-between px-2 sm:px-0 w-full sm:max-w-md">
        <button class="btn-sm m-2 bg-gray-700" @click="toggleSort">{{this.oldFirst ? "Oldest" : "Newest"}} First</button>
        <button class="btn-sm m-2 bg-red-500" @click="clearAll">Clear All</button>
    </div>
    <div class="max-h-100 overflow-auto px-2 w-full sm:max-w-md">
        <DistractionCard v-for="(distraction, index) in this.distractionList" v-bind:key="distraction" :distraction="distraction" @deleteSelf="this.$emit('clearOne', index)"/>
    </div>
</template>

<script>
import DistractionCard from "./DisctractionCard.vue"

export default {
    components: {
        DistractionCard
    },
    props: {
        distractionList: Array,
        oldFirst: Boolean
    },
    methods: {
        toggleSort () {
            this.$emit('toggleSort', !this.oldFirst)
        },
        clearAll() {
            if( confirm("Are you sure you want to clear all previous distractions?") )
                this.$emit('clearAll')
        }
    }
}
</script>