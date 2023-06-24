import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  'vue实例',
  '模板语法',
  '计算属性与侦听器',
  '条件渲染',
  '表单输入绑定',
  'Prop',
  '插槽',
  '处理边界情况',
].map((filename, idx) => {
  return {
    path: idx === 0 ? '/' : '/' + filename,
    name: filename,
    component: () => import('../views/' + filename + '.vue'),
  };
});

const router = new VueRouter({
  routes,
});

export default router;
