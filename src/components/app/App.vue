<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="container app-content">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script src="./app.js">
</script>

<style lang="css">
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.app-content {
  padding: 60px 15px 0;
}
</style>
