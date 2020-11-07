<template>
  <draggable v-model="answers" class="max-w-lg">
    <div
      class="mt-1 cursor-move"
      v-for="element in answers"
      :key="element.text"
    >
      <div class="bg-white rounded">
        {{ element.text }}
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