<template>
  <div :class="{ disabled }">
    <div
      :class="[
        'bg-white px-2 py-2 rounded-md cursor-pointer transition-all duration-300 answer relative overflow-hidden',
        { active: selected === answer.id },
        { winning: isWinning(answer.votes) },
        { 'show-results': showResults },
      ]"
      v-for="answer in orderedAnswers"
      :key="answer.id"
      @click="selected = answer.id"
    >
      <input
        v-model="selected"
        type="radio"
        :value="answer.id"
        :id="answer.id"
        name="answers"
        class="hidden"
      />
      <label class="cursor-pointer" :for="answer.id">
        <div class="label">
          <span class="w-4/5">{{ answer.answer_string }}</span>
          <span class="circle self-start"></span>
        </div>
        <transition name="fade">
          <div
            v-if="showResults"
            class="flex items-center justify-between absolute left-0 mt-1 w-full px-2"
          >
            <span
              >{{ answer.votes }} vote<span v-if="answer.votes !== 1"
                >s</span
              ></span
            >
            <span>{{ getPercentage(answer.votes) }}%</span>
          </div>
        </transition>
      </label>
      <transition name="fade">
        <div
          v-if="showResults"
          class="percent-bar w-full bg-gray-200 absolute bottom-0 left-0"
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
                  selected === answer.id && !isWinning(answer.votes),
              },
              { 'bg-green-400': isWinning(answer.votes) },
            ]"
            :style="`width: ${getPercentage(answer.votes)}%;`"
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Answer } from '~/utils/types'

export default Vue.extend({
  name: 'SingleSelect',
  props: {
    answers: {
      type: Array,
      required: true,
    } as PropOptions<any[]>,
    value: {
      type: Array,
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
    selected: {
      get(): string {
        return this.value[0] as string
      },
      set(value: string) {
        this.$emit('input', [value])
      },
    },
    votesArray(): number[] {
      return this.answers.map((a) => a.votes)
    },
    totalVotes(): number {
      return this.votesArray?.reduce((a, b) => a + b, 0)
    },
    orderedAnswers(): Answer[] {
      return this.answers.sort((a, b) => {
        return a.index - b.index
      })
    },
  },
  methods: {
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
.label {
  @apply flex justify-between items-center transition-all duration-150;
}

.circle {
  @apply border-gray-500 border-solid border-2 rounded-3xl w-5 h-5 relative transition-all duration-150;
  &::before {
    content: '\00a0 ';
    @apply w-3 h-3 inline-block absolute rounded-3xl transition-colors duration-150;
    top: 0.1rem;
    left: 0.15rem;
  }
}

.active {
  @apply text-primary;
  box-shadow: 0 4px 17px -2px rgba(125, 131, 255, 0.2),
    0 7px 3px -1px rgba(125, 131, 255, 0.1);

  .circle {
    @apply border-primary;
  }

  .circle {
    &::before {
      @apply bg-primary;
    }
  }
}
.answer:not(:first-of-type) {
  @apply mt-5;
}

.percent-bar {
  width: 100px;
}

.disabled {
  @apply pointer-events-none;
  .active .label {
    @apply shadow-none;
    .circle {
      @apply border-purple-300 #{!important};
      &::before {
        @apply bg-purple-300;
      }
    }
  }
}

.show-results {
  padding-bottom: 2.5rem !important;
  &.winning {
    @apply text-green-400;
    .circle {
      @apply border-green-400 #{!important};
    }
    &.active {
      box-shadow: 0 4px 17px -2px rgba(116, 252, 150, 0.2),
        0 7px 3px -1px rgba(116, 252, 150, 0.1);
      .label {
        .circle {
          @apply border-green-400 #{!important};
          &::before {
            @apply bg-green-400;
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>