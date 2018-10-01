<template>
  <div v-if="showExpandedPatientInfo" class="expanded-data">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <p class="patient-name">
          <span class="has-text-weight-bold">Name:</span> {{ patient.name }}</p>
        </div>
        <div class="column">
          <p class="patient-address">
          <span class="has-text-weight-bold">Address:</span> {{ patient.address }}</p>
        </div>
        <div class="column">
          <p class="patient-phone-number">
          <span class="has-text-weight-bold">Phone Number:</span> {{ patient.phoneNumber }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="patient-email">
          <span class="has-text-weight-bold">Email:</span> {{ patient.email }}</p>
        </div>
        <div class="column">
          <p class="patient-last-visit">
          <span class="has-text-weight-bold">Last Visit:</span> {{ patient.lastVisit | fullDate }}</p>
        </div>
        <div class="column">
          <p class="patient-number-of-sessions">
          <span class="has-text-weight-bold">Number of Sessions:</span> {{ patient.numberOfSessions }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <p class="patient-reason">
          <span class="has-text-weight-bold">Reason:</span> {{ patient.reason }}</p>
        </div>
        <div class="column is-half">
          <p class="patient-diagnosis">
          <span class="has-text-weight-bold">Diagnosis:</span> {{ patient.diagnosis }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="patient-notes">
          <span class="has-text-weight-bold">Notes:</span> {{ patient.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import EventBus from '../eventbus';

export default {
  name: 'PatientExpandedDetails',
  filters: {
    fullDate(date) {
      return moment(date, 'MM-DD-YY').format('MMMM Do, YYYY');
    },
  },
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
  mounted() {
    EventBus.$on('toggle-expanded-patient-details', id => {
      if (this.patient._id === id) {
        this.showExpandedPatientInfo = !this.showExpandedPatientInfo;
      }
    });
  },
};
</script>

<style lang="scss">
.expanded-data {
  padding: 1rem;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
