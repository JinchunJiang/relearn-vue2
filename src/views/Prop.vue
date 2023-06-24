<template>
  <div>
    <base-input required placeholder="基础输入框" v-bind="post" />
    <base-checkbox v-model="checked" />
  </div>
</template>
<script>
import baseInput from '../components/Prop/baseInput.vue';
import baseCheckbox from '../components/Prop/baseCheckbox.vue';
export default {
  components: {
    baseInput,
    baseCheckbox,
  },
  data() {
    return {
      post: {
        id: 1,
        title: '123',
      },
      checked: true,
    };
  },
  watch: {
    checked(val) {
      console.log('checked change', val);
    },
  },
};
</script>
