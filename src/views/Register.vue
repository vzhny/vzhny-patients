<template>
  <div class="container">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Register
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <form @submit.prevent="register">
                <div class="field">
                  <label class="label">Full Name</label>
                  <div class="control">
                    <input v-model="fullName" class="input" type="text">
                  </div>
                  <p v-if="fullNameInvalid" class="help is-danger">Please enter your full name.</p>
                </div>
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input v-model="username" class="input" type="text">
                  </div>
                  <p v-if="usernameInvalid" class="help is-danger">Please enter a username.</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input v-model="password" class="input" type="password">
                  </div>
                  <p v-if="passwordInvalid" class="help is-danger">Please enter a password longer than 6 characters.</p>
                </div>
              </form>
            </div>
            <p v-if="errorRegistering" id="error-text" class="help is-danger">There was an error trying to register. Please try again later.</p>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="register">Submit</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      fullName: '',
      username: '',
      password: '',
      fullNameInvalid: false,
      usernameInvalid: false,
      passwordInvalid: false,
      errorRegistering: false,
    };
  },
  methods: {
    register() {
      if (!this.fullName.length) {
        this.fullNameInvalid = true;
      } else {
        this.fullNameInvalid = false;
      }

      if (!this.username.length) {
        this.usernameInvalid = true;
      } else {
        this.usernameInvalid = false;
      }

      if (this.password.length < 7) {
        this.passwordInvalid = true;
      } else {
        this.passwordInvalid = false;
      }

      if (this.checkFormValidation()) {
        const url = 'https://vzhny-patients-api.herokuapp.com/api/auth/register';
        const credentials = {
          name: this.fullName,
          username: this.username,
          password: this.password,
        };

        axios
          .post(url, credentials)
          .then(response => {
            this.$store.commit('currentlyLoggedIn', { token: response.data.token });
            this.$router.push('/dashboard');
          })
          .catch(error => {
            this.errorRegistering = true;
          });
      }
    },
    checkFormValidation() {
      if (!this.fullNameInvalid && !this.usernameInvalid && !this.passwordInvalid) {
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
  text-align: center;
}
</style>