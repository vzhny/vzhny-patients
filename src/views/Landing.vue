<template>
  <section class="landing">
    <div class="container">
      <div class="columns">
        <div class="column">
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
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: 'Full patient data manipulation',
          body: 'Create, retrieve, update, and delete patient information',
        },
        {
          title: 'Authentication and authorization',
          body: 'You saved data is safe and secure',
        },
        {
          title: 'Simple and straightforward design',
          body: 'Quickly and efficiently manage all your patients',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/settings.scss';

.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/images/landing-background-blurred.jpeg');
  color: $off-white;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

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

h1,
h2,
p {
  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}
</style>

