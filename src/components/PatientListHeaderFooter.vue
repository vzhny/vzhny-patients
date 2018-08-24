<template>
  <div class="head columns is-variable is-1">
    <div class="column is-2">
      <p class="patient-name">Name</p>
    </div>
    <div class="column">
      <p class="patient-reason">Reason(s)</p>
    </div>
    <div class="column">
      <p class="patient-diagnosis">Diagnosis</p>
    </div>
    <div class="column">
      <p class="patient-notes">Notes</p>
    </div>
    <div class="column is-1">
      <p class="patient-last-visit">Last Visit</p>
    </div>
    <div class="column is-1">
      <p class="patient-actions">Actions</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientListHeaderFooter',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
