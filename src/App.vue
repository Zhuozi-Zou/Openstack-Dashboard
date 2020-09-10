<template>
  <div id="app">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">home</router-link> |-->
    <!--      <router-link :to="{ name: 'About' }">About</router-link>-->
    <!--    </div>-->
    <router-view key="default"/>
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
}

body {
  margin: 0;
}

.router-enter {
  opacity: 0;
}

.router-enter-active {
  transition: opacity 1s ease;
}

.router-enter-to {
  opacity: 1;
}

.router-leave {
  opacity: 1;
}

.router-leave-active {
  transition: opacity 1s ease;
}

.router-leave-to {
  opacity: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: mintcream;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
