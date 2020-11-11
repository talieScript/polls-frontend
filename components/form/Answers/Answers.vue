<template>
  <div>
    <label for="answers">Answers</label>
    <draggable
      v-model="answers"
      id="answers"
      class="max-w-lg"
      ghost-class="ghost"
      @end="dragging = false"
      @start="dragging = true"
    >
      <div
        class="mt-1 flex items-center answer-div"
        @mousedown="dragging = true"
        @mouseup="dragging = false"
        :class="{ 'pr-4': dragging }"
        v-for="(answer, index) in answers"
        :key="answer.text"
      >
        {{ index + 1 }}
        <div
          class="cursor-move bg-white rounded flex-grow px-2 py-2 flex justify-between items-center ml-3"
        >
          <fa :icon="['fa', 'grip-lines']" />
          <span class="text-right ml-6">{{ answer.text }}</span>
        </div>
        <fa
          v-if="!dragging"
          ref="trash"
          :icon="['fa', 'trash']"
          :error="'Max 100 chrectors, sorry'"
          class="trash ml-1 text-sm hover:text-red transition-color duration-200 cursor-pointer z-10"
          @mousedown="deleteAnswer(index)"
        />
      </div>
    </draggable>
    <div class="flex items-center jus w-full">
      <TextInput
        v-model="answerInput"
        class="flex-1 ml-6"
        ariaDescribedby="add answer"
        placeholder="Add an answer"
        :error.sync="inputError"
        :rules="[
          (input) => {
            return input.length <= 100 ? '' : 'Max 100 characters, sorry'
          },
        ]"
        :maxCharacters="100"
      />
      <button
        class="bg-blue-400 hover:bg-blue-300 rounded p-1 text-xs ml-3 text-white transition-colors duration-200 flex items-center mt-3"
        @click.prevent="addAnswer"
      >
        <span>ADD</span> <fa class="ml-1" :icon="['fa', 'plus']" />
      </button>
      <!-- -->
    </div>
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
      dragging: false,
      answerInput: '',
      inputError: undefined,
    }
  },
  computed: {
    answers: {
      get(): any[] {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    } as any,
  },
  methods: {
    hideTrash() {
      this.$refs.trash.forEach((el: any) => (el.style.opacity = 0))
    },
    showTrash() {
      this.$refs.trash.forEach((el: any) => (el.style.opacity = null))
    },
    deleteAnswer(index) {
      this.answers.splice(index, 1)
      this.dragging = false
    },
    answerInputRule(input) {
      if (input.length < 100) {
        return 'Max 100 chrectors, sorry'
      }
    },
    addAnswer() {
      this.answers.push({
        text: this.answerInput,
      })
      this.answerInput = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.4;
}
</style>