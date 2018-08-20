<template>
  <div class="patient-details card">
    <div v-if="patientClicked" class="card-header">
      <p class="card-header-title"></p>
    </div>
    <div class="card-content">
      <p>Click a patient to view their details.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientDetails',
  data() {
    return {
      patientClicked: false,
    };
  },
};
</script>

<style lang="scss">
</style>
