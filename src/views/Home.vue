<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>VERSION: {{ VERSION }}</p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import config from '../config';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',

  components: {
    HelloWorld,
  },

  computed: {
    VERSION: {
      get() {
        return config.VERSION;
      },
    },
  },
};
</script>
