<template>
  <div>
    <label v-if="label" for="text-input" class="block">
      {{ label }}
    </label>
    <input
      id="text-input"
      :placeholder="placeholder"
      type="text"
      :aria-describedby="ariaDescribedby"
      :class="['rounded', 'p-1', `${width ? `w-${width}` : ''}`, 'font-black']"
    />
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
</style>