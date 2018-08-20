<template>
  <div class="dashboard container is-fluid">
    <div class="columns">
      <div class="column">
        <vzhny-add-patient-card v-if="showAddPatientCard" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <vzhny-patient-list v-if="!feedback" />
        <p v-else>{{ feedback }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PatientList from '@/components/PatientList';
import AddPatientCard from '@/components/AddPatientCard';
import axios from 'axios';
import EventBus from '../eventbus.js';

export default {
  name: 'Dashboard',
  components: {
    'vzhny-patient-list': PatientList,
    'vzhny-add-patient-card': AddPatientCard,
  },
  data() {
    return {
      feedback: null,
      showAddPatientCard: false,
    };
  },
  created() {
    const url = 'https://vzhny-patients-api.herokuapp.com/api/patients';
    const userLoggedIn = this.$store.getters.checkIfLoggedIn;

    if (userLoggedIn) {
      axios
        .get(url)
        .then(response => {
          this.$store.commit('listOfPatients', { patients: response.data });
        })
        .catch(error => {
          console.log('Unsuccessful get:', error);
          this.feedback = 'Error retrieving patients from the server. Please try again.';
        });
    } else {
      this.feedback = 'Not currently logged in. Please log in to display your patients.';
    }
  },
  mounted() {
    EventBus.$on('add-new-patient', () => {
      this.showAddPatientCard = true;
    });

    EventBus.$on('close-add-patient-card', () => {
      this.showAddPatientCard = false;
    });
  },
};
</script>

<style lang="scss">
</style>
