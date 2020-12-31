<template>
  <div :class="{ disabled }">
    <div
      :class="[
        'bg-white p-2 rounded-md text-right cursor-pointer transition-all duration-150 answer',
        { active: selected === answer.id },
        { winning: isWinning(answer.votes) },
      ]"
      v-for="answer in answers"
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
      <label class="w-full cursor-pointer" :for="answer.id">
        <div class="label">
          <span>{{ answer.answer_string }}</span>
          <span class="circle"></span>
        </div>
        <div class="">
          <span>{{ answer.votes }} votes</span>
          <span>{{ getPercentage(answer.votes) }}%</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

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
  },
  methods: {
    getPercentage(votes) {
      const totalVotes = this.votesArray.reduce((a, b) => a + b, 0)
      return Math.round((votes / totalVotes) * 100)
    },
    isWinning(votes) {
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

.winning {
  @apply text-green-400;
  .circle {
    @apply border-green-300 #{!important};
  }
  &.active {
    box-shadow: 0 4px 17px -2px rgba(116, 252, 150, 0.2),
      0 7px 3px -1px rgba(116, 252, 150, 0.1) !important;
    .label {
      .circle {
        @apply border-green-300 #{!important};
        &::before {
          @apply bg-green-300;
        }
      }
    }
  }
}
</style>