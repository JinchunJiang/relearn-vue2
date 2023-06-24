<template>
  <div>
    <input type="text" v-model="input1" />
    <input type="text" v-model.lazy="input2" />
    <input type="text" v-model.trim="input3" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: 'aaa',
      input2: 'bbb',
      input3: '',
    };
  },
  watch: {
    input1() {
      console.log('input1 发生变化');
    },
    input2() {
      console.log('input2 发生变化');
    },
    input3(val) {
      console.log('input2 发生变化', val);
    },
  },
};
</script>
