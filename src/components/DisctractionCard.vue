<template>
    <div class="bg-gray-700 hover:bg-opacity-50 mb-2 py-2 px-3 rounded-lg bg-opacity-25 relative" @mouseover="hover = true" @mouseleave="hover = false">
        <div class="text-xl w-5/6">{{ distraction.name }}</div>
            <div class="flex flex-row text-sm self-end mt-2">
                <span v-if="Date.now() - this.distraction.time > 24 * 60 * 60 * 1000">{{ this.fTime.date }}</span>
                <span v-else>{{ this.fTime.time }}</span>
            </div>
        <div class="">{{ distraction.tag }}</div>
        <span v-if="hover" class="absolute top-0 right-2.5 text-red-500 text-2xl cursor-pointer" @click="this.$emit('deleteSelf')">&times;</span>
    </div>
</template>

<script>
const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default {
    props: {
        distraction: Object
    },
    data () {
        return {
            fTime: this.formatTime(this.distraction.time),
            hover: false,
        }
    },
    methods: {
    formatTime(time) {
        time = new Date(time)
        let date = time.getDate()
        let year = time.getFullYear()
        let month = months[time.getMonth()]
        let day = days[time.getDay()]

        let hour = (time.getHours() < 12) ? time.getHours() : time.getHours() - 12;
        let ampm = (time.getHours() < 12) ? "AM" : "PM"
        let minute = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes()

        return { 
                date: `${day}, ${date} ${month} ${year}`,
                time: `${hour}:${minute} ${ampm}`
        }
    },
} 
}
</script>