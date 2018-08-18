<template>
  <nav class="navbar is-info">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="../assets/images/vzhny-logo.png" alt="vzhny patients" width="112" height="28">
      </router-link>
    </div>

    <div class="navbar-menu">
      <div v-if="currentlyLoggedIn" class="navbar-start">
        <div class="navbar-item">
          <a class="button is-text" href="#">Hello, Doctor!</a>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/register" class="button is-text">Register</router-link>
        </div>
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/login" class="button is-text">Login</router-link>
        </div>
        <div class="navbar-item">
          <a v-if="currentlyLoggedIn" class="button is-text" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      currentlyLoggedIn: false,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'currentlyLoggedIn') {
        this.currentlyLoggedIn = this.$store.getters.checkIfLoggedIn;
      }
    });
  },
  methods: {
    logout() {
      const url = 'https://vzhny-patients-api.herokuapp.com/api/auth/logout';

      axios
        .post(url)
        .then(response => {
          this.$store.commit('currentlyLoggedIn', { token: null });
          this.$router.push('/');
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
</style>
