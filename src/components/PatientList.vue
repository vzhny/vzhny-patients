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
      <vzhny-patient-list-header />
      <div v-for="(patient, index) in paginatedData" :key="index" class="patients-list-item">
        <vzhny-patient-details :patient="patient" />
        <vzhny-patient-expanded-details :patient="patient" />
      </div>
      <vzhny-patient-list-footer />
    </div>
    <p v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
import PatientListHeaderFooter from '@/components/PatientListHeaderFooter';
import PatientDetails from '@/components/PatientDetails';
import PatientExpandedDetails from '@/components/PatientExpandedDetails';

import EventBus from '../eventbus';

export default {
  name: 'PatientList',
  components: {
    'vzhny-patient-list-header': PatientListHeaderFooter,
    'vzhny-patient-list-footer': PatientListHeaderFooter,
    'vzhny-patient-details': PatientDetails,
    'vzhny-patient-expanded-details': PatientExpandedDetails,
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

.card-content {
  .head.columns {
    font-weight: bold;
    border-bottom: 2px solid $off-white;
  }

  .data.columns {
    margin-bottom: 8px;
  }

  .foot.columns {
    font-weight: bold;
    border-top: 2px solid $off-white;
  }
}

.patient {
  &-last-visit {
    text-align: center;
  }

  &-actions {
    text-align: right;
  }
}

.card-content > .patients-list-item {
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
    &-address,
    &-email,
    &-phone-number,
    &-reason,
    &-diagnosis,
    &-notes,
    &-last-visit,
    &-number-of-sessions,
    &-actions {
      text-align: center;
    }
  }
}
</style>
