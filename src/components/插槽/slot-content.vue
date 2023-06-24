<template>
  <div>
    <header>
      <!-- 具名插槽 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 默认插槽 -->
      <!-- 等同于name="default" -->
      <!-- 可以为插槽添加后备内容(缺省内容) -->
      <slot>主要内容</slot>
    </main>
    <footer>
      <!-- 作用域插槽 -->
      <slot name="footer" :user="user"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: 'zhangsan',
        age: 30,
      },
    };
  },
};
</script>
