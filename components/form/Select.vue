<template>
  <div
    :class="[{ disabled, open }, 'relative select']"
    v-click-outside="onClickOutside"
  >
    <button
      @click.prevent="open = !open"
      aria-label="Drop down toggle"
      :class="'button rounded border px-2 py-1 flex justify-between items-center cursor-pointer w-full outline-none z-10 bg-white'"
    >
      <span>{{ selected }}</span
      ><fa
        :icon="['fa', 'chevron-down']"
        :class="[
          'transform -rotate-0 transition-transform duration-200',
          {
            'rotate-180': open,
          },
        ]"
      />
    </button>
    <div class="z-0 draw text-sm">
      <ol>
        <li
          v-for="option in options"
          :key="option.value"
          :class="[
            {
              'bg-secondary font-bold': selected === option.text,
            },
          ]"
        >
          <button
            class="w-full h-full text-left hover:bg-gray-100 cursor-pointer px-3 py-2 outline-none"
            @click.prevent="handleSelect(option.value)"
          >
            {{ option.text }}
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import ClickOutside from 'vue-click-outside'

export default Vue.extend({
  name: 'Select',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    } as PropOptions<{ text: string; value: string }[]>,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    selected: {
      get(): string {
        return this.options.find((o) => o.value === this.value)?.text
      },
      set(value: string) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleSelect(value) {
      this.selected = value
      this.open = false
    },
    onClickOutside() {
      this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
.draw {
  max-height: 0;
  @apply absolute w-full h-auto z-0 overflow-hidden mb-2 bg-white transition-all duration-200;
}

.disabled {
  @apply text-gray-300;
}

.open {
  .button {
    border-radius: 0.25rem 0.25rem 0 0 !important;
    padding-bottom: 0.3rem !important;
    @apply border-b-0 #{!important};
  }
  .draw {
    border-radius: 0 0 0.25rem 0.25rem !important;
    max-height: 15rem;
    @apply border border-t-0;
  }
}

.select {
  min-width: 10rem;
}
</style>