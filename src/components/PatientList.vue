<template>
  <div class="patient-list card">
    <header class="card-header">
      <p class="card-header-title flexed">
        <span class="total-patients">Total Patients: {{ filteredPatients.length }}</span>
        <span class="page-information">
          <button :disabled="atFirstPage()" class="page-button button" @click="prevPage">
            <i class="fas fa-arrow-left" />
          </button>
          <span class="page-counter">Page: {{ pageNumber + 1 }} of {{ pageCount }}</span>
          <button :disabled="atLastPage()" class="page-button button" @click="nextPage">
            <i class="fas fa-arrow-right" />
          </button>
        </span>
        <span class="search-bar control">
          <input id="search" v-model="search" type="text" name="search" placeholder="Search by Patient Name">
        </span>
      </p>
    </header>
    <div class="card-content">
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
      <div v-for="(patient, index) in paginatedData" :key="index" class="data columns is-variable is-1">
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
            <a class="crud-action-more-info" @click="expandPatientInformation(patient)">
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
      <div class="foot columns is-variable is-1">
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
      pageNumber: 0,
      pageSize: 10,
    };
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(patient => patient.name.toLowerCase().includes(this.search.toLowerCase()));
    },
    pageCount() {
      const { length } = this.searchedPatients();
      const size = this.pageSize;
      return Math.ceil(length / size);
    },
    paginatedData() {
      const start = this.pageNumber * this.pageSize;
      const end = start + this.pageSize;
      return this.searchedPatients().slice(start, end);
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
      this.showExpandedPatientInfo = !this.showExpandedPatientInfo;
    },
    searchedPatients() {
      return this.patients.filter(patient => patient.name.toLowerCase().includes(this.search.toLowerCase()));
    },
    nextPage() {
      this.pageNumber += 1;
    },
    prevPage() {
      this.pageNumber -= 1;
    },
    atFirstPage() {
      return this.pageNumber === 0;
    },
    atLastPage() {
      return this.pageNumber >= this.pageCount - 1;
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

.page-counter {
  margin: 0 1rem;
}

.page-button {
  margin-top: 7px;
  display: inline;
}

#search {
  padding: 10px;

  &::placeholder {
    color: darken($off-white, 30);
  }
}

.head.columns {
  font-weight: bold;
  border-bottom: 2px solid $off-white;
}

.foot.columns {
  font-weight: bold;
  border-top: 2px solid $off-white;
}

.data.columns {
  margin-bottom: 8px;
}

.patient {
  &-last-visit {
    text-align: center;
  }

  &-actions {
    text-align: right;
  }
}

.card-content > .data.columns {
  &:nth-child(odd) {
    background-color: #fafafa;
  }

  &:nth-child(even) {
    background-color: #fff;
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

@media screen and (max-width: 768px) {
  .flexed {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .page-information {
      margin: 1rem 0;
    }
  }

  .patient {
    &-name,
    &-reason,
    &-diagnosis,
    &-notes,
    &-actions {
      text-align: center;
    }
  }
}
</style>
