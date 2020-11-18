<template>
  <div>
    <h2 class="text-lg">Answers</h2>
    <p
      v-if="!answers.length"
      class="text-sm font-light text-gray-500 text-center mt-8"
    >
      You have no answers 😯
    </p>
    <draggable
      v-model="answers"
      id="answers"
      class="max-w-lg mt-8"
      ghost-class="ghost"
      :animation="0"
      @end="dragging = false"
      @start="dragging = true"
    >
      <transition-group type="transition" name="flip-list">
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
            class="trash ml-2 text-sm hover:text-red transition-color duration-200 cursor-pointer z-10"
            @mousedown="deleteAnswer(index)"
          />
        </div>
      </transition-group>
    </draggable>
    <div class="flex items-center jus w-full mt-2">
      <TextInput
        v-model="answerInput"
        label="answer input"
        class="flex-1"
        ariaDescribedby="add answer"
        placeholder="Add an answer"
        :error.sync="inputError"
        :rules="[
          (input) => {
            return input.length <= 100 ? '' : 'Max 100 characters, sorry'
          },
          (input) => (!input ? 'Cannot be empty' : ''),
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
    error: {
      type: Boolean,
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
    deleteAnswer(index) {
      this.answers.splice(index, 1)
      this.dragging = false
    },
    answerInputRule(input) {
      if (input.length < 100) {
        return 'Max 100 chrectors, sorry'
      }
    },
    addAnswer(): void | undefined {
      if (!this.answerInput) {
        this.inputError = 'Cannot be empty'
        return
      }
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
.flip-list-move {
  transition: transform 0.3s;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: opacity 0.4s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}
</style>