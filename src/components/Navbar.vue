<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1>vzhny patients</h1>
      </div>
      <a :class="{ 'is-active': hamburgerClicked }" class="navbar-burger burger" data-target="nav-menu" @click="expandMobileNavMenu">
        <span/>
        <span/>
        <span/>
      </a>
    </div>

    <div id="nav-menu" :class="{ 'is-active': hamburgerClicked }" class="navbar-menu">
      <div v-if="currentlyLoggedIn" class="navbar-start">
        <div class="navbar-item">
          <a class="navbar-link-button" @click="emitAddNewPatient">
            <span class="icon">
              <i class="fas fa-user-plus" />
            </span>
            <span>Add a New Patient</span>
          </a>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/register" class="navbar-link-button">
            <span class="icon">
              <i class="fas fa-plus-square" />
            </span>
            <span>Register</span>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link v-if="!currentlyLoggedIn" to="/login" class="navbar-link-button">
            <span class="icon">
              <i class="fas fa-sign-in-alt" />
            </span>
            <span>Login</span>
          </router-link>
        </div>
        <div class="navbar-item">
          <a v-if="currentlyLoggedIn" class="navbar-link-button" @click="logout">
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
      hamburgerClicked: false,
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
    expandMobileNavMenu() {
      this.hamburgerClicked = !this.hamburgerClicked;
      return this.hamburgerClicked;
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
  background-color: $blue;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;

  .navbar-brand {
    .navbar-burger.burger {
      color: $off-white;
    }

    .navbar-item > h1 {
      cursor: default;
      color: $off-white;
      font-size: 1.4rem;
    }
  }

  #nav-menu {
    background-color: $blue;
  }

  .navbar-link-button,
  .navbar-link-button:visited {
    padding: 8px;
    color: $off-white;

    &:hover {
      color: #fff;
      border: solid 1px #fff;
      border-radius: 4px;
      margin: -1px;
    }
  }

  // .button.is-text {
  //   color: $off-white;
  //   text-decoration: none;
  //   transition: all 250ms ease-in-out;

  //   &.is-active,
  //   &:hover {
  //     color: invert($off-white);
  //     transition: all 250ms ease-in-out;
  //   }
  // }
}
</style>
