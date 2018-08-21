<template>
  <div class="login container">
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
                    <input v-model="username" class="input" type="text">
                    <span class="icon is-small is-left">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <p v-if="usernameInvalid" class="help is-danger">Please enter a username.</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left">
                    <input v-model="password" class="input" type="password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock" />
                    </span>
                  </div>
                  <p v-if="passwordInvalid" class="help is-danger">Please enter a password.</p>
                </div>
              </form>
            </div>
            <p v-if="errorLoggingIn" id="error-text" class="help is-danger has-text-centered">There was an error trying to log in. Please try again later.</p>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="login">Submit</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      usernameInvalid: false,
      passwordInvalid: false,
      errorLoggingIn: false,
    };
  },
  methods: {
    login() {
      if (!this.username.length) {
        this.usernameInvalid = true;
      } else {
        this.usernameInvalid = false;
      }

      if (!this.password.length) {
        this.passwordInvalid = true;
      } else {
        this.passwordInvalid = false;
      }

      if (this.checkFormValidation()) {
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
            this.errorRegistering = true;
          });
      }
    },
    checkFormValidation() {
      if (!this.usernameInvalid && !this.passwordInvalid) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.card-header-title {
  font-size: 2rem;
}

#error-text {
  font-size: 1rem;
}
</style>
