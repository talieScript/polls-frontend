<template>
  <draggable v-model="answers" class="max-w-lg">
    <div class="mt-1" v-for="answer in answers" :key="answer.text">
      <div class="cursor-move bg-white rounded px-2 py-2 text-right">
        <fa :icon="['fa', 'grip-lines']" />
        <!-- <i class="fas fa-address-card"></i>x -->
        {{ answer.text }}
      </div>
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  name: 'Answers',
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      answers: [{ text: 'here1' }, { text: 'here2' }, { text: 'here3' }],
    }
  },
})
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>