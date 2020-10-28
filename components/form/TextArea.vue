<template>
  <div
    :class="[
      'relative',
      'mt-5',
      `${width ? `w-${width}` : ''}`,
      outline ? 'rounded' : 'rounded-t-sm',
      outline ? 'border' : 'border-b-2',
      { outline },
      'focus-within:border-primary',
    ]"
  >
    <textarea
      id="text-input"
      :placeholder="' '"
      type="text"
      :aria-describedby="ariaDescribedby"
      :class="[
        'input p-1 text-black block w-full appearance-none focus:outline-none z-10',
        { 'p-2': outline },
        outline ? 'rounded' : 'rounded-t-sm',
        `bg-${bgColor}`,
      ]"
    />
    <label
      v-if="label"
      for="text-input"
      :class="[
        'label absolute top-0 px-1z-0 duration-300 origin-0',
        outline ? 'mt-2' : 'mt-0',
        outline ? 'ml-2' : 'ml-1',
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
</style>