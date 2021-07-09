<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js Skills App"/>
    <Skills :certs=certis  />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Skills from "./components/Skills.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Skills
  },
  data() {
    return {
      certis: ["MCSD: App Builder", "MCSD: Web Dev"]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
