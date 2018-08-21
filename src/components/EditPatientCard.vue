<template>
  <transition name="slide-down">
    <div class="add-patient card">
      <header class="card-header">
        <p class="card-header-title">
          {{ patient.name }}
        </p>
        <a class="card-header-icon close-button" @click="emitCloseEditPatientCard">
          <span class="icon">
            <i class="fas fa-times" />
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <form>
            <div class="container">
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Full Name</label>
                    <div class="control is-expanded">
                      <input v-model="patient.name" class="input" type="text">
                    </div>
                    <p v-if="errors.nameInvalid" class="help is-danger">Please enter the patient's full name.</p>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control is-expanded">
                      <input v-model="patient.address" class="input" type="text">
                    </div>
                    <p v-if="errors.addressInvalid" class="help is-danger">Please enter the patient's address.</p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control is-expanded">
                      <input v-model="patient.phoneNumber" class="input" type="text">
                    </div>
                    <p v-if="errors.phoneNumberInvalid" class="help is-danger">Please enter the patient's phone number.</p>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control is-expanded">
                      <input v-model="patient.email" class="input" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Reason(s) For Visit</label>
                    <div class="control is-expanded">
                      <textarea v-model="patient.reason" class="textarea" rows="3" />
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Diagnosis</label>
                    <div class="control is-expanded">
                      <textarea v-model="patient.diagnosis" class="textarea" rows="3" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Notes</label>
                    <div class="control is-expanded">
                      <textarea v-model="patient.notes" class="textarea" rows="4" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Last Visit</label>
                    <div class="control is-expanded">
                      <input v-model="patient.lastVisit" class="input" type="text">
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Number of Sessions</label>
                    <div class="control is-expanded">
                      <input v-model="patient.numberOfSessions" class="input" type="number">
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <p v-if="feedback" id="error-text" class="help is-danger has-text-centered">{{ feedback }}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <p v-if="errors.errorEditingPatient" id="error-text" class="help is-danger has-text-centered">There was an error trying to edit the patient. Please try again later.</p>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="updatePatient">Update Patient</a>
      </footer>
    </div>
  </transition>
</template>

<script>
import EventBus from '../eventbus.js';
import formValidationMixin from '../mixins/patientFormValidationMixin.js';

export default {
  name: 'EditPatientCard',
  mixins: [formValidationMixin],
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      patient: {
        name: null,
        address: null,
        phoneNumber: null,
        email: null,
        reason: null,
        diagnosis: null,
        notes: null,
        lastVisit: null,
        numberOfSessions: null,
      },
      feedback: null,
    };
  },
  mounted() {
    EventBus.$on('show-add-patient-card', () => {
      this.showAddPatientCard = true;
    });
  },
  created() {
    const url = `https://vzhny-patients-api.herokuapp.com/api/patients/${this.id}`;

    this.$http
      .get(url)
      .then(response => {
        this.patient = response.data;
        this.patient.numberOfSessions += 1;
      })
      .catch(error => console.log(error));
  },
  methods: {
    emitCloseEditPatientCard() {
      EventBus.$emit('close-edit-patient-card');
    },
    updatePatient() {
      const url = `https://vzhny-patients-api.herokuapp.com/api/patients/${this.id}`;
      const userLoggedIn = this.$store.getters.checkIfLoggedIn;

      this.showValidationErrors();

      if (userLoggedIn) {
        if (!this.checkPatientFormValidation()) {
          this.feedback = 'Please fill out the form correctly and resubmit.';
        } else {
          this.$http
            .put(url, this.patient)
            .then(response => {
              this.emitCloseEditPatientCard();
              EventBus.$emit('update-patient-list');
            })
            .catch(error => {
              this.feedback = error;
            });
        }
      } else {
        this.feedback = 'Not currently logged in. Please log in to display your patients.';
      }
    },
  },
};
</script>

<style lang="scss">
@import '../styles/settings.scss';

.slide-down-enter-active {
  transition: 500ms;
}

.slide-down-leave-active {
  transition: 250ms;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translate(0, -100%);
}

#error-text {
  font-size: 1rem;
}

.close-button {
  color: $red;
}
</style>
