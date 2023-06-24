<template>
  <div id="app">
    <h1>重学vue2</h1>
    <nav>
      <router-link v-for="route in routes" :key="route.name" :to="route.path">{{
        route.name
      }}</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router';
export default {
  data() {
    return {
      routes,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 16px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
