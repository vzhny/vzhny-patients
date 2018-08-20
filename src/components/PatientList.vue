<template>
  <div class="patient-list card">
    <div class="card-content">
      <table v-if="!noPatients" class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reason(s)</th>
            <th>Diagnosis</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in patients" :key="index">
            <td>{{ patient.name }}</td>
            <td>{{ patient.reason }}</td>
            <td>{{ patient.diagnosis }}</td>
            <td>{{ patient.notes }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Reason(s)</th>
            <th>Diagnosis</th>
            <th>Notes</th>
          </tr>
        </tfoot>
      </table>
      <p v-if="noPatients" class="add-patients-text has-text-centered">Please begin by adding a patient using the link above!</p>
    </div>
  </div>
</template>

<script>
import PatientDetails from '@/components/PatientDetails';

export default {
  name: 'PatientList',
  components: {
    'vzhny-patient-details': PatientDetails,
  },
  data() {
    return {
      noPatients: false,
      patients: [],
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'listOfPatients') {
        this.patients = this.$store.getters.retrievePatients;
      }
    });

    if (this.patients.length === 0) {
      this.noPatients = true;
    }
  },
};
</script>

<style lang="scss">
.add-patients-text {
  font-size: 2rem;
}
</style>
