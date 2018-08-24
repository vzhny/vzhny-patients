<template>
  <section class="dashboard">
    <div class="container is-fluid">
      <div v-if="showAddPatientCard" class="columns">
        <div class="column">
          <vzhny-add-patient-card />
        </div>
      </div>
      <div v-if="showEditPatientCard" class="columns">
        <div class="column">
          <vzhny-edit-patient-card :id="patientId" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <vzhny-patient-list v-if="!feedback" />
          <p v-else>{{ feedback }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PatientList from '@/components/PatientList';
import AddPatientCard from '@/components/AddPatientCard';
import EditPatientCard from '@/components/EditPatientCard';
import EventBus from '../eventbus.js';

export default {
  name: 'Dashboard',
  components: {
    'vzhny-patient-list': PatientList,
    'vzhny-add-patient-card': AddPatientCard,
    'vzhny-edit-patient-card': EditPatientCard,
  },
  data() {
    return {
      feedback: null,
      showAddPatientCard: false,
      showEditPatientCard: false,
      patientId: null,
    };
  },
  mounted() {
    EventBus.$on('show-add-patient-card', () => {
      this.showAddPatientCard = true;
    });

    EventBus.$on('close-add-patient-card', () => {
      this.showAddPatientCard = false;
    });

    EventBus.$on('show-edit-patient-card', id => {
      this.patientId = id;
      this.showEditPatientCard = true;
    });

    EventBus.$on('close-edit-patient-card', () => {
      this.showEditPatientCard = false;
    });
  },
};
</script>

<style lang="scss">
@import '../styles/settings.scss';
@import '../styles/mixins.scss';
</style>
