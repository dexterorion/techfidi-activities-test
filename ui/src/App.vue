<template>
  <div id="app">
    <h3>Techifide Fullstack Test</h3>
    <activity></activity>
  </div>
</template>

<script>
import ActivityVue from './components/Activity.vue'

export default {
  name: 'App',
  components: {
    'activity': ActivityVue
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

#app {
  margin-top: 60px;
}

#app h3{
  text-align: center;
}
</style>