<template>
    <div class="flex flex-col py-5 px-2 sm:px-0 w-full sm:max-w-md">
      <input class="form-control w-96 w-full ring-green-600 mb-3" v-model="distractionName" placeholder="Think about this later" @keyup.enter="submit"/> 
      <button class="btn bg-green-600 max-w-max self-end" @click="submit"><span class="font-bold">Enter</span> &#8629;</button>
    </div>
</template>

<script>

export default  {
    data() {
        return {
            distractionName: '',
            disctractionTag: 'Thought',
            distraction: {},
        }
    },
    emits: ['submit'],
    methods: {
        submit() {
            if(this.distractionName) {
                this.distraction = {
                    name: this.distractionName,
                    time: Date.now(),
                    tag: this.distractionTag,
                }
                this.$emit('submit', this.distraction)
                this.distractionName = ''
                this.distraction = {}
            }
        }
    }
}
</script>
