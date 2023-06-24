<template>
  <div>
    <child1 />
  </div>
</template>
<script>
import child1 from '../components/处理边界情况/child1';
export default {
  components: {
    child1,
  },
  data() {
    return {};
  },
  provide: {
    user1: {
      name: '张三',
      age: 30,
    },
    user2: {
      name: '李四',
      age: 18,
    },
  },
};
</script>
