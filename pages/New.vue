<template>
  <div>
    <TextInput v-model="input" label="Title" bgColor="secondary"  />
    <TextArea v-model="input" label="Question" bgColor="white" outline  />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: 'hello'
    }
  },
}
</script>

<style lang="scss" scoped>
</style>