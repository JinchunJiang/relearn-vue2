<template>
  <div>
    <!-- 常见的是使用 Mustache(双花括号/大胡子)语法的文本插值 -->
    <p>hello: {{ name1 }}</p>
    <!-- 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。 -->
    <p v-once>hello: {{ name2 }}</p>
    <!-- 原始HTML -->
    <hr />
    <p>{{ rawHtml }}</p>
    <p v-html="rawHtml"></p>
    <!-- Attribute -->
    <hr />
    <button v-bind:disabled="disabled">禁用的按钮</button>
    <!-- 表达式 -->
    <hr />
    {{ number + 1 }}

    {{ ok ? 'YES' : 'NO' }}

    {{ message.split('').reverse().join('') }}

    <div v-bind:id="'list-' + id">{{ 'list-' + id }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name1: 'world',
      name2: 'zhangsan',
      rawHtml: '<span style="color: red">原始HTML</span>',
      disabled: true,
      number: 8,
      ok: true,
      message: 'hello',
      id: 'id',
    };
  },
  mounted() {
    setTimeout(() => {
      this.name1 = 'lisi';
      this.name2 = 'lisi';
    }, 3000);
  },
};
</script>
