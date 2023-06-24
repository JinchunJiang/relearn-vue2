<template>
  <div></div>
</template>
<script>
export default {
  inject: ['user1', 'user2'],
  mounted() {
    console.log(this.user1);
    console.log(this.user2);
  },
};
</script>
