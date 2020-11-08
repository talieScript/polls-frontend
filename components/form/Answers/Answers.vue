<template>
  <draggable
    v-model="answers"
    class="max-w-lg"
    ghost-class="ghost"
    @start="startDrag"
    @end="endDrag"
  >
    <div
      class="mt-1 flex items-center answer-div"
      @mousedown="startDrag"
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
        class="trash ml-1 text-sm hover:text-red transition-colors duration-200 opacity-0 cursor-pointer"
      />
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
    startDrag() {
      this.$refs.trash.forEach((el: any) => el.classList.add('opacity-0'))
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

.sortable-chosen .trash {
  @apply opacity-0 #{!important};
}
</style>