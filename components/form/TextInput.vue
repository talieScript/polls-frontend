<template>
  <div
    :class="[
      'relative',
      'mt-5',
      `${width ? `w-${width}` : ''}`,
      { rounded: outline },
      outline ? 'border' : 'border-b-2',
      { outline },
      'focus-within:border-primary',
    ]"
  >
    <input
      id="text-input"
      :placeholder="' '"
      type="text"
      :aria-describedby="ariaDescribedby"
      :class="[
        'input p-1 text-black block w-full appearance-none focus:outline-none z-10 rounded',
        { 'p-2': outline },
        { rounded: outline },
        `bg-${bgColor}`,
      ]"
      @input="emitInput($event.target.value)"
      :value="value"
      :required="required"
    />
    <label
      v-if="label"
      for="text-input"
      :class="[
        'label absolute top-0 px-1z-0 duration-300 origin-0',
        outline ? 'mt-2' : 'mt-1',
        outline ? 'ml-2' : 'ml-0',
      ]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
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
      required: false,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      required: false,
    }
  },
  methods: {
    emitInput(input) {
      this.$emit('input', input)
    }
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
</style>