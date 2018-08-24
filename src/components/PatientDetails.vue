<template>
  <div class="data columns is-variable is-1">
    <div class="column is-2">
      <p class="patient-name">{{ patient.name }}</p>
    </div>
    <div class="column">
      <p class="patient-reason">{{ patient.reason }}</p>
    </div>
    <div class="column">
      <p class="patient-diagnosis">{{ patient.diagnosis }}</p>
    </div>
    <div class="column">
      <p class="patient-notes">{{ patient.notes }}</p>
    </div>
    <div class="column is-1">
      <p class="patient-last-visit">{{ patient.lastVisit }}</p>
    </div>
    <div class="column is-1">
      <p class="patient-actions">
        <a class="crud-action-more-info" @click="expandPatientInformation(patient._id)">
          <i class="fas fa-arrow-circle-down" />
        </a>
        <a class="crud-action-edit" @click="editPatient(patient._id)">
          <i class="fas fa-pen" />
        </a>
        <a class="crud-action-delete" @click="deletePatient(patient._id)">
          <i class="fas fa-times" />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventbus.js';

export default {
  name: 'PatientDetails',
  props: {
    patient: {
      type: Object,
      default() {},
    },
  },
  data() {
    return {
      showExpandedPatientInfo: false,
    };
  },
  methods: {
    editPatient(id) {
      EventBus.$emit('show-edit-patient-card', id);
    },
    deletePatient(id) {
      const url = `https://vzhny-patients-api.herokuapp.com/api/patients/${id}`;
      const userLoggedIn = this.$store.getters.checkIfLoggedIn;

      if (userLoggedIn) {
        this.$http
          .delete(url)
          .then(response => {
            EventBus.$emit('update-patient-list');
          })
          .catch(error => {
            this.feedback = 'Error deleting the patient from the server. Please try again.';
          });
      } else {
        this.feedback = 'Not currently logged in. Please log in to display your patients.';
      }
    },
    expandPatientInformation(id) {
      EventBus.$emit('toggle-expanded-patient-details', id);
    },
  },
};
</script>

<style lang="scss">
.data.columns {
  font-size: 1.1rem;
}
</style>
