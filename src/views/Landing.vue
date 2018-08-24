<template>
  <section class="landing">
    <div class="container">
      <div class="columns">
        <div class="leading column">
          <h1 class="title">
            Welcome to vzhny patients!
          </h1>
          <h2 class="subtitle">
            A Vue-powered web app, providing a secure place to keep and update general patient information.
          </h2>
        </div>
      </div>
      <div class="features columns">
        <div v-for="(feature, index) in features" :key="index" class="column is-one-third">
          <p class="heading has-text-centered">{{ feature.title }}</p>
          <p class="has-text-centered">{{ feature.body }}.</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="feedback">{{ feedback }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      features: [
        {
          title: 'Full patient data manipulation',
          body: 'Record and edit patient information',
        },
        {
          title: 'Authentication and authorization',
          body: 'Save and secure essential data',
        },
        {
          title: 'Simple and elegant design',
          body: 'Efficiently manage patient information',
        },
      ],
      feedback: 'Please allow a few moments for the server to start up!',
    };
  },
  mounted() {
    const url = 'https://vzhny-patients-api.herokuapp.com/';

    this.$http
      .get(url)
      .then((this.feedback = 'The server currently running, please feel free to register or log in!'))
      .catch(error => {
        this.feedback = 'The server is currently experiencing some issues. Please try again later.';
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/settings.scss';
@import '../styles/mixins.scss';

.landing {
  @include background-styles;
  text-align: default;

  .title {
    color: $off-white;
    font-size: 5rem;
  }

  .subtitle {
    color: $off-white;
  }

  .heading {
    font-size: 1.5rem;
  }
}

.feedback {
  text-align: center;
  font-size: 2rem;
  color: lighten($green, 10);
}

h1,
h2,
p {
  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}

@media screen and (max-width: 768px) {
  .landing {
    text-align: center;
  }
}
</style>

