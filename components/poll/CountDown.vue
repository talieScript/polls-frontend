<template>
  <div class="h-full">
    <p class="text-xs">Time Remaining</p>
    <div
      class="flex item s-center justify-between text-lg"
      :class="`text-${color}`"
    >
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakDown.days }}
        <span class="text-xs text-gray-500">D</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakDown.hours }}
        <span class="text-xs text-gray-500">H</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakDown.minutes }}
        <span class="text-xs text-gray-500">M</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakDown.seconds }}
        <span class="text-xs h-full text-gray-500">S</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
export default Vue.extend({
  name: 'CountDown',
  props: {
    endDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeTo: 0,
      dayjs,
    }
  },
  mounted() {
    setInterval(this.counter, 1000)
    // this.timeTo = 1081640000
  },
  methods: {
    counter(): void {
      this.timeTo = dayjs(this.endDate).diff(dayjs())
    },
  },
  computed: {
    timeBreakDown(): any {
      const { timeTo } = this
      const days = dayjs(timeTo).get('day')
      const hours = dayjs(timeTo).get('hour')
      const minutes = dayjs(timeTo).get('minute')
      const seconds = dayjs(timeTo).get('second')
      return {
        days,
        hours,
        minutes,
        seconds,
      }
    },
    color() {
      const { timeTo } = this
      let color = ''
      switch (true) {
        // less then a day
        case timeTo < 86400000:
          color = 'yellow-500'
          break
        // less then an hour
        case timeTo < 3600000:
          color = 'red'
          break
        default:
          color = 'green-500'
      }
      return color
    },
  },
})
</script>

<style scoped>
</style>