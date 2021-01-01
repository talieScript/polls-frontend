<template>
  <fieldset>
    <div
      v-for="answer in answers"
      :key="answer.id"
      class="flex answer transition-all duration-200 relative rounded bg-white overflow-hidden cursor-pointer"
      :class="[
        { checked: checkedAnswers.includes(answer.id) },
        { disabled },
        { winning: isWinning(answer.votes) },
        { 'show-results': showResults },
      ]"
      @click="toggleCheck(answer.id)"
    >
      <input
        v-model="checkedAnswers"
        :id="answer.id"
        type="checkbox"
        class="w-0 h-0"
        :value="answer.id"
        :checked="checkedAnswers.includes(answer.id)"
        :disabled="disabled"
      />
      <div
        class="box transition-all duration-200 flex items-center justify-between"
        :class="{ 'cursor-pointer': !disabled }"
      >
        <label :for="answer.id" class="label mr-auto pointer-events-none w-4/5">
          {{ answer.answer_string }}
        </label>
        <div
          class="checkBox flex justify-center align-middle p-0 w-6 h-6 border rounded bg-gray-100 transition-all duration-200 self-start"
        >
          <fa
            class="opacity-0 mt-1 transition-all duration-200 tick"
            :class="[
              { 'opacity-100': checkedAnswers.includes(answer.id) },
              { 'text-gray-400': disabled },
              {
                'text-green-400':
                  isWinning(answer.votes) && showResults && !disabled,
              },
            ]"
            :icon="['fa', 'check']"
          />
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="showResults"
          class="flex items-center justify-between absolute left-0 bottom-0 mb-3 w-full px-2 transition-all duration-200"
        >
          <span
            >{{ answer.votes }} vote<span v-if="answer.votes !== 1"
              >s</span
            ></span
          >
          <span>{{ getPercentage(answer.votes) }}%</span>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="showResults"
          class="percent-bar w-full bg-gray-200 absolute bottom-0 left-0 transition-all duration-200"
          :class="`${showResults ? 'h-2' : 'h-0'}`"
        >
          <div
            class="h-full"
            :class="[
              {
                'bg-gray-500': true,
              },
              {
                'bg-primary':
                  checkedAnswers.includes(answer.id) &&
                  !isWinning(answer.votes),
              },
              { 'bg-green-400': isWinning(answer.votes) },
            ]"
            :style="`width: ${getPercentage(answer.votes)}%;`"
          ></div>
        </div>
      </transition>
    </div>
  </fieldset>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ApiAnswer } from '@/utils/types'

export default Vue.extend({
  name: 'MultiSelect',
  data(): any {
    return {}
  },
  props: {
    answers: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    } as PropOptions<string[]>,
    answerNumber: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    showResults: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    checkedAnswers: {
      get(): string[] {
        return this.value
      },
      set(value: ApiAnswer) {
        this.$emit('input', value)
      },
    } as any,
    votesArray(): number[] {
      return this.answers.map((a) => a.votes)
    },
    totalVotes(): number {
      return this.votesArray.reduce((a, b) => a + b, 0)
    },
  },
  methods: {
    toggleCheck(id): void {
      if (this.disabled) {
        return
      }
      const answerIndex = this.checkedAnswers.indexOf(id)
      if (answerIndex + 1) {
        this.checkedAnswers.splice(answerIndex, 1)
      } else if (this.checkedAnswers.length < this.answerNumber) {
        this.checkedAnswers.push(id)
      }
    },
    getPercentage(votes) {
      if (votes < 1) {
        return 0
      }
      return Math.round((votes / this.totalVotes) * 100)
    },
    isWinning(votes) {
      if (!this.totalVotes) {
        return false
      }
      return votes === Math.max(...this.votesArray)
    },
  },
})
</script>

<style lang="scss" scoped>
.tick {
  @apply text-primary;
}
.answer:not(:first-of-type) {
  @apply mt-6;
}
.box {
  @apply px-3 py-3 w-full rounded flex justify-between align-middle;
}

input:focus + .box {
  @apply shadow-outline;
}

.checked {
  box-shadow: 0 4px 17px -2px rgba(125, 131, 255, 0.2),
    0 7px 3px -1px rgba(125, 131, 255, 0.1);
  @apply text-primary;

  .checkBox {
    @apply bg-purple-100 border-primary #{!important};
  }
}

.disabled {
  .checkBox {
    @apply border-gray-500 #{!important};
  }
}

.show-results {
  &.winning {
    @apply text-green-400;
  }
  &.checked {
    &.winning {
      box-shadow: 0 4px 17px -2px rgba(116, 252, 150, 0.2),
        0 7px 3px -1px rgba(116, 252, 150, 0.1);

      .checkBox {
        @apply bg-green-100 border-green-400 #{!important};
      }
    }
  }
  padding-bottom: 2rem !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>