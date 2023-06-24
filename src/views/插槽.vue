<template>
  <div>
    <slot-content>
      <!-- 也可以缩写为#header -->
      <template v-slot:header>
        <h1>标题</h1>
      </template>
      <template v-slot:footer="slotProps">
        <p>{{ slotProps.user.name }}: {{ slotProps.user.age }}</p>
      </template>
      <!-- 作用域插槽也可以通过解构 -->
      <!-- <template #footer="{ user }">
        <p>{{ user.name }}: {{ user.age }}</p>
      </template> -->
    </slot-content>
  </div>
</template>
<script>
import slotContent from '../components/插槽/slot-content';
export default {
  components: {
    slotContent,
  },
};
</script>
