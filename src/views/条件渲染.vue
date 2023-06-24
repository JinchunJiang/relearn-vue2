<template>
  <div>
    <ul>
      <!-- vue2中 v-for 优先级比 v-if 要高 -->
      <!-- vue3中 v-if 优先级比 v-for 高  -->
      <li v-for="n in 10" v-if="n % 2 === 0">{{ n }}</li>
    </ul>
  </div>
</template>
