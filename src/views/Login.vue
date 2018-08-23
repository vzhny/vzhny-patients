<template>
  <section class="login">
    <div class="container">
      <div class="columns">
        <div class="column is-offset-one-quarter is-half">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-centered">
                Login
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <form @keyup.enter="login">
                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left">
                      <input v-model="username" :class="{'is-danger': errors.usernameInvalid}" class="input" type="text">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user" />
                      </span>
                    </div>
                    <p v-if="errors.usernameInvalid" class="help is-danger">Please enter a username.</p>
                  </div>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left">
                      <input v-model="password" :class="{'is-danger': errors.passwordInvalid}" class="input" type="password">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock" />
                      </span>
                    </div>
                    <p v-if="errors.passwordInvalid" class="help is-danger">Please enter a password.</p>
                  </div>
                </form>
              </div>
              <p v-if="errorLoggingIn" id="error-text" class="help is-danger has-text-centered">{{ errorLoggingIn }}</p>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="login">Submit</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: {
        usernameInvalid: false,
        passwordInvalid: false,
      },
      errorLoggingIn: null,
    };
  },
  watch: {
    username() {
      this.errors.usernameInvalid = false;
      this.errorLoggingIn = null;
    },
    password() {
      this.errors.passwordInvalid = false;
      this.errorLoggingIn = null;
    },
  },
  methods: {
    login() {
      this.showLoginValidationErrors();

      if (this.checkLoginFormValidation()) {
        const url = 'https://vzhny-patients-api.herokuapp.com/api/auth/login';
        const credentials = {
          username: this.username,
          password: this.password,
        };

        this.$http
          .post(url, credentials)
          .then(response => {
            this.$store.commit('currentlyLoggedIn', { token: response.data.token });
            this.$http.defaults.headers.common['x-auth-token'] = this.$store.getters.retrieveAuthToken;
            this.$router.push('/dashboard');
          })
          .catch(error => {
            this.errorLoggingIn = 'There was an error trying to log in. Please try again later.';
          });
      } else {
        this.errorLoggingIn = 'Please fill out the login form correctly.';
      }
    },
    checkLoginFormValidation() {
      if (!this.errors.usernameInvalid && !this.errors.passwordInvalid) {
        return true;
      }
      return false;
    },
    showLoginValidationErrors() {
      if (!this.username.length) {
        this.errors.usernameInvalid = true;
      } else {
        this.errors.usernameInvalid = false;
      }

      if (!this.password.length) {
        this.errors.passwordInvalid = true;
      } else {
        this.errors.passwordInvalid = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/settings.scss';
@import '../styles/mixins.scss';

.login {
  @include background-styles;
}

.card-header-title {
  font-size: 2rem;
}

#error-text {
  font-size: 1rem;
}
</style>
