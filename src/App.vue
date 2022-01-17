<template>
  <div class="container">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {}
};
</script>

<style>
.slide-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  font-family: Calibri, Helvetica, sans-serif;
  background-image: url("./assets/background.jpg");

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin: 0px;
}

.container {
  max-width: 500px;
  margin: 25vh auto;
  overflow: auto;
  min-height: 300px;
  border: 3px solid white;
  padding: 30px;
  border-radius: 20px;
  background: white;
  box-shadow: 0.8vh 1.5vh #bdb2b2;
}
</style>
