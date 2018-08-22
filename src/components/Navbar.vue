<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <!-- May redirect to /dashboard again, depends on how link-active is reacting to responsiveness -->
      <div class="navbar-item">
        <img src="../assets/images/vzhny-logo.png" alt="vzhny patients" width="112" height="28">
      </div>
      <a class="navbar-burger burger">
        <span/>
        <span/>
        <span/>
      </a>
    </div>

    <div class="navbar-menu">
      <div v-if="currentlyLoggedIn" class="navbar-start">
        <div class="navbar-item">
          <a class="button is-text" @click="emitAddNewPatient">
            <span class="icon">
              <i class="fas fa-user-plus" />
            </span>
            <span>Add a New Patient</span>
          </a>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/register" class="button is-text">
            <span class="icon">
              <i class="fas fa-plus-square" />
            </span>
            <span>Register</span>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/login" class="button is-text">
            <span class="icon">
              <i class="fas fa-sign-in-alt" />
            </span>
            <span>Login</span>
          </router-link>
        </div>
        <div class="navbar-item">
          <a v-if="currentlyLoggedIn" class="button is-text" @click="logout">
            <span class="icon">
              <i class="fas fa-sign-out-alt" />
            </span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import EventBus from '../eventbus.js';

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
    emitAddNewPatient() {
      EventBus.$emit('show-add-patient-card');
    },
    logout() {
      const url = 'https://vzhny-patients-api.herokuapp.com/api/auth/logout';

      this.$http
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
@import '../styles/settings.scss';

.navbar {
  background-color: $purple;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);

  .button.is-text {
    color: $off-white;
    text-decoration: none;
    transition: all 250ms ease-in-out;

    &.is-active,
    &:hover {
      color: invert($off-white);
      transition: all 250ms ease-in-out;
    }
  }
}

.navbar-burger.burger {
  color: $off-white;
}
</style>
