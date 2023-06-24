<template>
  <div>
    <h1 @click="handleClick">{{ title }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'vue实例',
    };
  },
  methods: {
    handleClick() {
      console.log('---click---');
      this.title = '点击~';
      setTimeout(() => {
        this.$destroy();
      }, 2000);
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeCreate');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
};
</script>
