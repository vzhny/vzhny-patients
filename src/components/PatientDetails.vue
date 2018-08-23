<template>
  <div class="patient-details message is-dark">
    <div class="message-body">
      <h1>The Patient Details Component</h1>
      <p>{{ patient.name }}</p>
      <p>{{ patient.address }}</p>
      <p>{{ patient.phoneNumber }}</p>
      <p>{{ patient.email }}</p>
      <p>{{ patient.reason }}</p>
      <p>{{ patient.diagnosis }}</p>
      <p>{{ patient.notes }}</p>
      <p>{{ patient.lastVisit }}</p>
      <p>{{ patient.numberOfSessions }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientDetails',
  props: {
    patient: {
      type: Object,
      default() {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
