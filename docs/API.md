# 记录一些常用的 API

## 全局配置

- errorHandler
  指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。

  ```js
  Vue.prototype.errorHandler = function (err, vm, info) {
    // hanlde error
  };
  ```

- ignoredElements
  须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)。

  ```js
  Vue.config.ignoredElements = [
    'my-custom-web-component',
    'another-web-component',
    // 用一个 `RegExp` 忽略所有“ion-”开头的元素
    // 仅在 2.5+ 支持
    /^ion-/,
  ];
  ```

- performance
  设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上。

## 全局 API

- Vue.extend(options)
  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
  ```js
  // <div id="mount-point"></div>
  const Comp = Vue.extend({
    template: `<h1>hello world!</h1>`,
  });
  new Comp().$mount('#mount-point');
  ```
- Vue.nextTick([callback, context])
  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

- Vue.set( target, propertyName/index, value )

- Vue.delete( target, propertyName/index )

- Vue.directive( id, [definition] )

- Vue.filter( id, [definition] )

- Vue.component( id, [definition] )

- Vue.use( plugin )
  安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

  该方法需要在调用 new Vue() 之前被调用。

- Vue.mixin( mixin )

- Vue.compile( template )
  将一个模板字符串编译成 render 函数。只在完整版时可用。

- Vue.observable( object )
  让 object 变响应式对象

## 选项

### 数据

- data

- props

- propsData
  只用于 new 创建实例时传递 props

  ```js
  var Comp = Vue.extend({
    props: ['msg'],
    template: '<div>{{ msg }}</div>',
  });
  var vm = new Comp({
    propsData: {
      msg: 'hello',
    },
  });
  ```

- computed
- methods

- watch

### DOM

- el
  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

  在实例挂载之后，元素可以用 vm.$el 访问。

  如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。

- template

- render

### 生命周期

- beforeCreate
  在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。

- created
  在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。

- beforeMount
  在挂载开始之前被调用：相关的 render 函数首次被调用。

- mounted
  实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。

  注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 vm.$nextTick

- beforeUpdate
  在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

- updated
  在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

  当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

  注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick

- activated
  被 keep-alive 缓存的组件激活时调用。

- deactivated
  被 keep-alive 缓存的组件失活时调用。

- beforeDestroy
  实例销毁之前调用。在这一步，实例仍然完全可用。

- destroyed
  实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

- errorCaptured: (err: Error, vm: Component, info: string) => ?boolean
  在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

### 资源

- directives

- filters

- components

### 组合

- mixins

- extends
  允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。

  这和 mixins 类似。

  ```js
  var CompA = { ... }
  // 在没有调用 `Vue.extend` 时候继承 CompA
  var CompB = {
  extends: CompA,
  ...
  }
  ```

- provide/inject

  > 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

  示例一：

  ```js
  // 父级组件提供 'foo'
  var Provider = {
    provide: {
      foo: 'bar',
    },
    // ...
  };
  // 子组件注入 'foo'
  var Child = {
    inject: ['foo'],
    created() {
      console.log(this.foo); // => "bar"
    },
    // ...
  };
  ```

  > 在 2.5.0+ 的注入可以通过设置默认值使其变成可选项：

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' },
    },
    // 还可以为inject的key重命名
    inject2: {
      from: 'bar',
      default: 'foo',
    },
  };
  ```

### 其他

- functional
  使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使它们渲染的代价更小。

- model

- inheritAttrs

## 实例 property

- vm.$data

- vm.$props

- vm.$el

- vm.$options
  用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处

  ```js
  new Vue({
    customOption: 'foo',
    created: function () {
      console.log(this.$options.customOption); // => 'foo'
    },
  });
  ```

- vm.$parent

- vm.$root

- vm.$children

- 当前实例的直接子组件。

- vm.$slots
  用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

- vm.$scopedSlots
  用来访问作用域插槽。

- vm.$refs

- vm.$attrs

- vm.$listeners

## 实例方法

### 数据

- vm.$watch
  除了可以用来监听单个数据，还可以监听多个数据
  ```js
  vm.$watch(
    function () {
      // 表达式 `this.a + this.b` 每次得出一个不同的结果时
      // 处理函数都会被调用。
      // 这就像监听一个未被定义的计算属性
      return this.a + this.b;
    },
    function (newVal, oldVal) {
      // 做点什么
    }
  );
  ```
  vm.$watch 返回一个取消观察函数，用来停止触发回调：
  ```js
  var unwatch = vm.$watch('a', cb);
  // 之后取消观察
  unwatch();
  ```
- vm.$set

- vm.$delete

### 事件

- vm.$on

- vm.$once
  监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

- vm.$off
  移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；

  - 如果只提供了事件，则移除该事件所有的监听器；

  - 如果同时提供了事件与回调，则只移除这个回调的监听器。

- vm.$emit

### 生命周期

- vm.$mount
  用于手动挂载组件到 DOM 元素上

- vm.$forceUpdate
  迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

- vm.$nextTick

- vm.$destroy
  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

  触发 beforeDestroy 和 destroyed 的钩子。

## 指令

- v-text

  ```html
  <span v-text="msg"></span>
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

- v-html

- v-show

- v-if

- v-else

- v-else-if

- v-for

- v-on
  修饰符
  .stop - 调用 event.stopPropagation()。
  .prevent - 调用 event.preventDefault()。
  .capture - 添加事件侦听器时使用 capture 模式。
  .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  .native - 监听组件根元素的原生事件。
  .once - 只触发一次回调。
  .left - (2.2.0) 只当点击鼠标左键时触发。
  .right - (2.2.0) 只当点击鼠标右键时触发。
  .middle - (2.2.0) 只当点击鼠标中键时触发。
  .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
- v-bind
  修饰符
  .prop - 作为一个 DOM property 绑定而不是作为 attribute 绑定。
  .camel - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
  .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

- v-model

- v-slot

- v-pre
  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

  ```html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

- v-once
  只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## 特殊 attribute

- key
  常用来 vue 的虚拟 dom 算法。

  它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

  - 完整地触发组件的生命周期钩子
  - 触发过渡

- ref

- is
  用于动态组件且基于 DOM 内模板的限制来工作。
  ```html
  <!-- 当 `currentView` 改变时，组件也跟着改变 -->
  <component v-bind:is="currentView"></component>
  <!-- 这样做是有必要的，因为 `<my-row>` 放在一个 -->
  <!-- `<table>` 内可能无效且被放置到外面 -->
  <table>
    <tr is="my-row"></tr>
  </table>
  ```
-
