<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
  #app {
    font-family: Rambla;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-color: #0b1015;
  }

  html {
    background-image:linear-gradient(#0b1015, #0b1015);
    height:100%;
  }


.covered {
  font-family: Covered;
  font-size: 30px;
  color: yellow;
}

.covered-contrast {
  font-family: Covered;
  font-size: 30px !important;
  color: #0b1015 !important;
}

@font-face {
  font-family: Covered;
  src: url('CoveredByYourGrace.ttf');
}

@font-face {
  font-family: Rambla;
  src: url('Rambla-Regular.otf');
}
</style>
