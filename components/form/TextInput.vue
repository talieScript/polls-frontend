<template>
  <div
    :class="[
      'relative',
      `${width ? `w-${width}` : ''}`,
      'border-b-2',
      'focus-within:border-primary',
    ]"
  >
    <input
      id="text-input"
      :placeholder="' '"
      type="text"
      :aria-describedby="ariaDescribedby"
      class="input p-1 text-black block w-full appearance-none focus:outline-none z-10"
    />
    <label
      v-if="label"
      for="text-input"
      class="label absolute top-0 px-1 mt-1 z-0 duration-300 origin-0"
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
    width: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.input:focus-within ~ .label,
input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-6;
}

input:focus-within ~ label {
  @apply text-primary;
}
</style>