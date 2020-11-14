<template>
  <div class="w-full">
    <datetime
      type="datetime"
      v-model="date"
      format="dd/MM/yyyy - HH:mm"
      title="Pick a date"
      :class="['border rounded p-1 theme-primary w-full', { disabled }]"
    ></datetime>
    <fa
      :icon="['fa', 'calendar-week']"
      :class="[
        'absolute top-0 right-0 mt-2 mr-6 pointer-events-none',
        { disabled },
      ]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'
Settings.defaultLocale = 'en'
Settings.toFormat = 'dd mm yyyy hh:mm'

export default Vue.extend({
  name: 'DateTimePicker',
  components: {
    Datetime,
  },
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    date: {
      get(): string {
        return this.value
      },
      set(value: string) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.disabled {
  @apply text-gray-300 border-gray-300 #{!important};
}

::v-deep .vdatetime-input {
  @apply w-full;
}
</style>