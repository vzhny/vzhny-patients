<template>
  <transition name="slide-down">
    <div class="add-patient card">
      <header class="card-header">
        <p class="card-header-title">
          New Patient Information
        </p>
        <a class="card-header-icon close-button" @click="emitCloseAddPatientCard">
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
                      <input v-model="patient.name" :class="{'is-danger': errors.nameInvalid}" class="input" type="text">
                    </div>
                    <p v-if="errors.nameInvalid" class="help is-danger">Please enter the patient's name.</p>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control is-expanded">
                      <input v-model="patient.address" :class="{'is-danger': errors.addressInvalid}" class="input" type="text">
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
                      <input v-model="patient.phoneNumber" :class="{'is-danger': errors.phoneNumberInvalid}" class="input" type="text">
                    </div>
                    <p v-if="errors.phoneNumberInvalid" class="help is-danger">Please enter the patient's phone number.</p>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control is-expanded">
                      <input v-model="patient.email" class="input" type="email">
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
                      <input v-model="patient.lastVisit" :class="{'is-danger': errors.lastVisitInvalid}" class="input" type="text">
                    </div>
                    <p v-if="errors.lastVisitInvalid" class="help is-danger">Please enter the date in MM/DD/YY format.</p>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Number of Sessions</label>
                    <div class="control is-expanded">
                      <input v-model="patient.numberOfSessions" :class="{'is-danger': errors.numberOfSessionsInvalid}" class="input" type="number">
                    </div>
                    <p v-if="errors.numberOfSessionsInvalid" class="help is-danger">Please a minimum of one (1) session.</p>
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
        <p v-if="errors.errorAddingPatient" id="error-text" class="help is-danger has-text-centered">There was an error trying to add the patient. Please try again later.</p>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="addNewPatient">Add Patient</a>
      </footer>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';
import EventBus from '../eventbus';
import formValidationMixin from '../mixins/patientFormValidationMixin';

export default {
  name: 'AddPatientCard',
  mixins: [formValidationMixin],
  data() {
    return {
      patient: {
        name: '',
        address: '',
        phoneNumber: '',
        email: null,
        reason: null,
        diagnosis: null,
        notes: null,
        lastVisit: moment(Date.now()).format('MM/DD/YY'),
        numberOfSessions: 1,
      },
      feedback: null,
    };
  },
  methods: {
    emitCloseAddPatientCard() {
      EventBus.$emit('close-add-patient-card');
    },
    addNewPatient() {
      const url = 'https://vzhny-patients-api.herokuapp.com/api/patients';
      const userLoggedIn = this.$store.getters.checkIfLoggedIn;

      this.showValidationErrors();

      if (userLoggedIn) {
        if (!this.checkPatientFormValidation()) {
          this.feedback = 'Please fill out the form correctly and resubmit.';
        } else {
          this.$http
            .post(url, this.patient)
            .then(response => {
              this.emitCloseAddPatientCard();
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
