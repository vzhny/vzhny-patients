<template>
  <div id="app">
    <vzhny-navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    'vzhny-navbar': Navbar,
  },
  data() {
    return {};
  },
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed');
@import './styles/settings.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body,
html {
  height: 100%;
}

#app {
  font-family: 'Barlow Semi Condensed', sans-serif;
}

.link-is-active {
  color: #fff;
  border: solid 1px #fff;
  border-radius: 4px;
  margin: -1px;
}
</style>
