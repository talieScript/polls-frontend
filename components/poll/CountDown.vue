<template>
  <div class="h-18">
    <p class="text-xs">Time Remaining</p>
    <div
      class="flex -ml-3 item s-center justify-between text-lg"
      :class="`text-${color}`"
    >
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakdown.days }}
        <span class="text-xs text-gray-500">D</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakdown.hours }}
        <span class="text-xs text-gray-500">H</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakdown.minutes }}
        <span class="text-xs text-gray-500">M</span>
      </span>
      <span class="text-center w-4/5 flex flex-col">
        {{ timeBreakdown.seconds }}
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
      timeBreakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      } as any,
      interval: null,
      dayjs,
    }
  },
  mounted() {
    this.interval = setInterval(this.counter, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    counter(): void {
      const days = this.getDiff('d')
      const hours = this.getDiff('h') - days * 24
      const minutes = this.getDiff('m') - (days * 1440 + hours * 60)
      const seconds = Math.floor(
        (dayjs(this.endDate).diff(dayjs()) -
          (days * 86400000 + hours * 3600000 + minutes * 60000)) /
          1000
      )
      console.log('=', days * 86400000 + hours * 3600000 + minutes * 60000)
      console.log('milli', dayjs(this.endDate).diff(dayjs()))
      this.timeBreakdown = {
        days,
        hours,
        minutes,
        seconds,
      }
    },
    getDiff(unit: any): number {
      return dayjs(this.endDate).diff(dayjs(), unit)
    },
  },
  computed: {
    color() {
      const { timeBreakdown } = this
      let color = ''
      switch (true) {
        // less then a day
        case timeBreakdown.days < 1:
          color = 'yellow-500'
          break
        // less then an hour
        case timeBreakdown.hours < 1:
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