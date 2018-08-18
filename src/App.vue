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

#app {
  font-family: 'Barlow Semi Condensed', sans-serif;
}

.container {
  margin-top: 4rem;
}
</style>
