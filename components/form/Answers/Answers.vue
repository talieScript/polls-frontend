<template>
  <div>
    <label for="answers">Answers</label>
    <draggable
      v-model="answers"
      id="answers"
      class="max-w-lg"
      ghost-class="ghost"
      @end="showTrash"
    >
      <div
        class="mt-1 flex items-center answer-div"
        @mousedown="hideTrash"
        @mouseup="showTrash"
        v-for="answer in answers"
        :key="answer.text"
      >
        <div
          class="cursor-move bg-white rounded flex-grow px-2 py-2 flex justify-between items-center ml-3"
        >
          <fa :icon="['fa', 'grip-lines']" />
          <span class="text-right ml-6">{{ answer.text }}</span>
        </div>
        <fa
          ref="trash"
          :icon="['fa', 'trash']"
          class="trash ml-1 text-sm hover:text-red transition-colors duration-200 cursor-pointer"
        />
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
  props: {
    value: {
      type: Array,
    },
  },
  data(): any {
    return {
      answers: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean',
        },
        { text: 'here2' },
        { text: 'here3' },
      ],
    }
  },
  methods: {
    hideTrash() {
      this.$refs.trash.forEach((el: any) => (el.style.opacity = 0))
    },
    showTrash() {
      console.log('here')
      this.$refs.trash.forEach((el: any) => (el.style.opacity = null))
    },
  },
})
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.4;
}

.answer-div:hover .trash {
  @apply opacity-100;
}

.trash {
  @apply opacity-0;
}
</style>