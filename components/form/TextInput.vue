<template>
  <div :class="['z-10 mt-5 mb-4 relative', { error: localError }]">
    <div
      :class="[
        'input-div',
        'z-10',
        'relative',
        'focus-within:border-primary',
        `${width ? `w-${width}` : ''}`,
        outline ? 'border' : 'border-b-2',
        { rounded: outline },
        { outline },
        { error: localError },
      ]"
    >
      <input
        :id="`${label}-text-input`"
        :placeholder="placeholder || ' '"
        type="text"
        :aria-describedby="ariaDescribedby"
        :class="[
          'input text-black block w-full appearance-none focus:outline-none z-10 rounded',
          outline ? 'p-1' : 'py-1',
          { 'p-2': outline },
          { rounded: outline },
          `bg-${bgColor}`,
        ]"
        @input="handleInput($event.target.value)"
        :value="value"
        :required="required"
      />
      <label
        v-if="label"
        :for="`${label}-text-input`"
        :class="[
          'label absolute top-0 duration-300 origin-0',
          placeholder ? 'hidden' : '',
          outline ? 'mt-2' : 'mt-1',
          outline ? 'ml-2' : 'ml-0',
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
    <div
      v-if="maxCharacters"
      :class="[
        'absolute bottom-0 right-0 text-xs transform translate-y-4',
        { 'text-red': value.length > maxCharacters },
      ]"
    >
      {{ value.length }}/{{ maxCharacters }}
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
    rules: {
      type: Array,
      default: [],
    } as PropOptions<((input: string) => {})[]>,
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      required: false,
    },
    error: {
      type: String,
      required: false,
    } as PropOptions<string | boolean>,
    maxCharacters: {
      type: Number,
      required: false,
    },
  },
  computed: {
    localError: {
      get(): boolean | string {
        return this.error
      },
      set(value: any) {
        this.$emit('update:error', value)
      },
    } as any,
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
        this.localError = ''
      }
      this.$emit('input', input)
    },
  } as any,
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
  @apply transform scale-90 -translate-y-6;
}

.outline input:focus-within ~ .label,
.outline input:not(:placeholder-shown) ~ .label {
  @apply transform scale-90 -translate-y-8 z-0 px-1 py-0 -translate-x-2;
}

input:focus-within ~ label,
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