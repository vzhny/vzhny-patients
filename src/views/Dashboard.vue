<template>
  <div class="dashboard container">
    <div class="columns">
      <div class="column is-three-quarters">
        <vzhny-patient-list />
      </div>
      <div class="column is-onecheckIfLoggedIn-quarter">
        <vzhny-patient-details />
      </div>
    </div>
  </div>
</template>

<script>
import PatientList from '@/components/PatientList';
import PatientDetails from '@/components/PatientDetails';

export default {
  name: 'Dashboard',
  components: {
    'vzhny-patient-list': PatientList,
    'vzhny-patient-details': PatientDetails,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
