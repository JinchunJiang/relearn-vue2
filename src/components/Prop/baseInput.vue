<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: Number,
    title: String,
  },
  mounted() {
    console.log(this.id);
    console.log(this.title);
  },
};
</script>
