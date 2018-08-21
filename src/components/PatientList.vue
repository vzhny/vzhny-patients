<template>
  <div class="patient-list card">
    <header class="card-header">
      <p class="card-header-title flexed">
        <span>Total Patients: {{ filteredPatients.length }}</span>
        <span class="control is-pulled-right"><input id="search" v-model="search" type="text" name="search" placeholder="Search by Patient Name"></span>
      </p>
    </header>
    <div class="card-content">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reason(s)</th>
            <th>Diagnosis</th>
            <th>Notes</th>
            <th>Last Visit</th>
            <th>
              <span class="is-pulled-right">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in filteredPatients" :key="index">
            <td>{{ patient.name }}</td>
            <td>{{ patient.reason }}</td>
            <td>{{ patient.diagnosis }}</td>
            <td>{{ patient.notes }}</td>
            <td>{{ patient.lastVisit }}</td>
            <td>
              <span class="is-pulled-right">
                <a class="crud-action-more-info" @click="expandPatientInformation(patient)">
                  <i class="fas fa-arrow-circle-down" />
                </a>
                <a class="crud-action-edit" @click="editPatient(patient._id)">
                  <i class="fas fa-pen" />
                </a>
                <a class="crud-action-delete" @click="deletePatient(patient._id)">
                  <i class="fas fa-times" />
                </a>
              </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Reason(s)</th>
            <th>Diagnosis</th>
            <th>Notes</th>
            <th>Last Visit</th>
            <th>
              <span class="is-pulled-right">Actions</span>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <p v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
import PatientDetails from '@/components/PatientDetails';
import EventBus from '../eventbus.js';

export default {
  name: 'PatientList',
  components: {
    'vzhny-patient-details': PatientDetails,
  },
  data() {
    return {
      patients: [],
      search: '',
      showExpandedPatientInfo: false,
      feedback: null,
    };
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(patient => patient.name.toLowerCase().includes(this.search));
    },
  },
  mounted() {
    EventBus.$on('update-patient-list', () => {
      this.fetchPatients();
    });
  },
  created() {
    this.fetchPatients();
  },
  methods: {
    fetchPatients() {
      const url = 'https://vzhny-patients-api.herokuapp.com/api/patients';
      const userLoggedIn = this.$store.getters.checkIfLoggedIn;

      if (userLoggedIn) {
        this.$http
          .get(url)
          .then(response => {
            this.patients = response.data;
          })
          .catch(error => {
            this.feedback = 'Error retrieving patients from the server. Please try again.';
          });
      } else {
        this.feedback = 'Not currently logged in. Please log in to display your patients.';
      }
    },
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
    expandPatientInformation(patient) {
      console.log(patient);
      this.showExpandedPatientInfo = !this.showExpandedPatientInfo;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/settings.scss';

.flexed {
  display: flex;
  justify-content: space-between;
}

#search {
  padding: 10px;

  &::placeholder {
    color: darken($off-white, 30);
  }
}

.add-patients-text {
  font-size: 2rem;
}

.crud-action-more-info {
  margin-right: 5px;
  color: $blue;
}

.crud-action-edit {
  margin-right: 5px;
  color: $green;
}

.crud-action-delete {
  margin-right: 5px;
  color: $red;
}
</style>
