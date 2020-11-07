<template>
  <div>
    <draggable
      v-model="answers"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        class="list-group-item"
        v-for="element in answers"
        :key="element.text"
      >
        {{ element.text }}
      </div>
    </draggable>
  </div>
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
      dragging: false,
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