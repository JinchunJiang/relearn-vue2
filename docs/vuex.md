# vuex

vuex 是用于 vue 中管理全局状态的库。
本文档中记录 vuex3.x(对于 vue2.x)版本的一些知识点。

> vuex 依赖 promise，如果浏览器版本不支持，需要自行安装 promise-polyfill 的库，例如 es6-promise

# 简单的 Store

```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // ...
  },
});
export default store;

// main.js
new Vue({
  // ...
  store,
});
```

至此， 就可以在 vue 组件中通过 this.$store获取到store的相关属性，例如`this.$store.state.xxx`获取全局状态，`this.$store.commit('xxx')`提交 mutations 来改变状态。

## 核心概念

### State

常见用法是通过`computed`获取状态，举个例子：

```js
computed: {
  count() {
    return this.$store.state.count
  }
}
```

当模块重用，如在一个 store 中重复创建同一个模块时，由于

#### mapState

当需要引入多个全局状态时，用上述方法写会显得重复且冗余。
vuex 提供了 mapState 辅助函数(**返回一个对象**)

```js
import { mapState } from 'vuex';

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
};
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```js
computed: {
  // 组件私有computed属性...
  ...mapState([
    // 映射 this.count 为 store.state.count
    'count',
    // 映射 this.name 为 store.state.name
    'name'
  ]);
}
```

### Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性，同样具有缓存功能）。

- 通过属性访问

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
  },
});
```

使用时，通过`this.$store.getters.doneTodos`即可

- 通过方法访问

```js
getters: {
  // ...
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id);
  };
}
```

使用时，通过`this.$store.getters.getTodoById(1)`即可

> 注意：通过方法访问时，不会缓存结果

#### mapGetters

和 mapState 类似，用于快捷获取一系列 getters

```js
computed: {
  // local computed ...
  ...mapGetters([
    'todo1',
    'todo2'
  ]),
  ...mapGetters({
    todo3: 'todo4'
  })
}
```

### Mutation

vuex 中更改 state 的唯一方式就是提交 mutation(不建议通过`this.$store.state.count = 1`这种形式来更改状态)。

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state, payload) {
      // 变更状态
      state.count += payload;
    },
  },
});
```

通过提交一个 mutation`store.commit('increment', 10)`来更改状态
payload 也可以是个对象，这样就可以提交多个值：

```js
mutations: {
  add(state, payload) {
    state.count += payload.a + payload.b
  }
}
// 方式一
store.commit('add', { a: 1, b: 2 })
// 方式二
store.commit({
  type: 'add',
  a: 1,
  b: 2
})
```

> 注意：mutation 必须是同步函数。

#### mapMutations

```js
export default {
  methods: {
    ...mapMutations(['increment']),
    ...mapMutations({
      add: 'plus',
    }),
  },
};
```

### Action

mutation 只支持通过同步的方式修改 state。
而 action 可以通过同步或者异步的方式来提交 mutation，从而达到修改 state 的目的。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    asyncIncrement(context, payload) {
      context.commit('increment', payload);
    },
  },
});
```

通过`store.dispatch('asyncIncrement', { amount: 10 })`来触发

#### mapActions

### module

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块内部状态

```js
const moduleA = {
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++;
    },
  },

  getters: {
    // 第三个参数获取到根节点状态
    doubleCount(state, getters, rootState) {
      return state.count * 2;
    },
  },
  actions: {
    // rootState获取根节点状态
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    },
  },
};
```

#### 命名空间

默认状态下，不同模块的 mutation、getter、action 是注册在全局命名空间的。
可以通过 namespaced： true 开启局部命名空间

```js
modules: {
  account: {
    getters: {
      isAdmin() {} // getters['account/isAdmin']
    },
    // 嵌套模块
    modules: {
      // 继承父模块的命名空间
      myPage: {
        state: () => ({ ... }),
        getters: {
          profile () { ... } // -> getters['account/profile']
        }
      },
      // 进一步嵌套命名空间
      posts: {
        namespaced: true,
        state: () => ({ ... }),
        getters: {
          popular () { ... } // -> getters['account/posts/popular']
        }
      }
    }
  }
}
```

启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。

#### 在带命名空间的模块内访问全局内容（Global Assets）

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

#### 在带命名空间的模块注册全局 action

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

#### 带命名空间的绑定函数

- 繁琐的写法

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

- 简洁的写法

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

- 更简洁的写法

```js
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module');

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b,
    }),
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions(['foo', 'bar']),
  },
};
```

#### 模块动态注册

- 注册模块
  ```js
  store.registerModule('moduleName', {
    // ...
  });
  ```
- 卸载模块
  `store.unregisterModule(moduleName)`

  > 注：只能删除动态添加的模块

- 检查模块是否已注册
  `store.hasModule(moduleName)`

##### 保留 state

在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 preserveState 选项将其归档：`store.registerModule('a', module, { preserveState: true })`。

当你设置 preserveState: true 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。

##### 模块重用

当创建一个模块的多个实例时，会遇到和 vue 组件的 data 一样的情况。这时候可以通过注册函数来解决(2.3.0+支持)

```js
state: () => ({
  // ...
});
```
