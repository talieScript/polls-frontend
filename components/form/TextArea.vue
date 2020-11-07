<template>
  <div :class="['z-10 mt-5 mb-4 relative', { error: localError }]">
    <div
      :class="[
        'input-div',
        'z-10',
        'relative',
        'focus-within:border-primary',
        `${width ? `w-${width}` : ''}`,
        outline ? 'rounded' : 'rounded-t-sm',
        outline ? 'border' : 'border-b-2',
        { outline },
        { error: localError },
      ]"
    >
      <textarea
        id="text-area"
        :placeholder="' '"
        type="text"
        :aria-describedby="ariaDescribedby"
        :class="[
          'input p-1 text-black block w-full appearance-none focus:outline-none z-10',
          { 'p-2': outline },
          outline ? 'rounded' : 'rounded-t-sm',
          `bg-${bgColor}`,
        ]"
        @input="handleInput($event.target.value)"
        :value="value"
        :required="required"
      />
      <label
        v-if="label"
        for="text-area"
        :class="[
          'label absolute top-0 px-1z-0 duration-300 origin-0',
          outline ? 'mt-2' : 'mt-0',
          outline ? 'ml-2' : 'ml-1',
        ]"
      >
        {{ label }}
      </label>
    </div>
    <div
      class="error-message absolute bottom-0 z-0 text-red text-xs duration-300"
    >
      {{ localError }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropOptions } from 'vue'
export default {
  name: 'TextInput',
  data(): any {
    return {}
  },
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    ariaDescribedby: {
      type: String,
      required: false,
    },
    /**
     * Tailwind width operator
     */
    width: {
      type: String,
      required: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: 'secondary',
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      required: false,
    },
    rules: {
      type: Array,
      default: [],
    } as PropOptions<((input: string) => {})[]>,
    error: {
      type: String,
      required: false,
    } as PropOptions<string | boolean>,
  },
  computed: {
    localError: {
      get(): boolean | string {
        return this.error
      },
      set(value: boolean | string): void {
        this.$emit('update:error', value)
      },
    },
  },
  methods: {
    handleInput(input: string): void {
      // handle rule validation
      const ruleBroken: boolean = this.rules.some((rule: any) => rule(input))
      if (ruleBroken) {
        this.rules.forEach((rule: any) => {
          const ruleOutput = rule(input)
          if (ruleOutput) {
            this.localError = ruleOutput
          }
        })
      } else {
        this.localError = false
      }
      this.$emit('input', input)
    },
  },
}
</script>

<style lang="scss" scoped>
.label {
  @apply text-gray-500;
}

.input:not(:focus):not(:placeholder-shown) ~ .label {
  @apply text-gray-600;
}

.input:focus-within ~ .label,
.input:not(:placeholder-shown) ~ .label {
  @apply transform scale-90 -translate-y-6 -translate-x-1;
}

.outline .input:focus-within ~ .label,
.outline .input:not(:placeholder-shown) ~ .label {
  @apply transform scale-90 -translate-y-8 z-0 px-1 py-0 -translate-x-3;
}

.input:focus-within ~ label,
.outline input:focus-within ~ label {
  @apply text-primary;
}

.error {
  @apply border-red  #{!important};

  & .input-div .label {
    @apply text-red  #{!important};
  }

  & .error-message {
    @apply transform translate-y-4;
  }
}
</style>