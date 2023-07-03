import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
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
routes.push({
  path: '/user/:id',
  name: '嵌套路由',
  component: () => import('../views/嵌套路由/index.vue'),
  children: [
    // 未匹配到其他子路由时
    // { path: '', component: UserHome },
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'profile',
      component: () => import('../views/嵌套路由/UserProfile.vue'),
    },
  ],
});

export { routes };
const router = new VueRouter({
  routes,
});

export default router;
