<template>
  <div>
    <div>{{ msg }}</div>
    <div>reverseMsg: {{ reverseMsg }}</div>
    <div>{{ fullName }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hello',
      firstName: 'san',
      lastName: 'zhang',
    };
  },
  computed: {
    reverseMsg() {
      return this.msg.split('').reverse().join('');
    },
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      set(newVal) {
        const names = newVal.split(' ');
        this.firstName = names.at(-1);
        this.lastName = names[0];
        console.log(this.firstName, this.lastName);
      },
    },
  },
  watch: {
    fullName(newVal, val) {
      console.log('===watch====');
      console.log(newVal, val);
    },
  },
  mounted() {
    setTimeout(() => {
      this.fullName = 'li si';
    }, 3000);
  },
};
</script>
