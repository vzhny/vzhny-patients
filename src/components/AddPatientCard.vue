<template>
  <transition name="slide-down">
    <div class="add-patient card">
      <header class="card-header">
        <p class="card-header-title">
          New Patient Information
        </p>
        <a class="card-header-icon" @click="emitCloseAddPatientCard">
          <span class="icon">
            <i class="fas fa-times" />
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <form @keyup.enter="addNewPatient">
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
import axios from 'axios';
import EventBus from '../eventbus.js';

export default {
  name: 'AddPatientCard',
  data() {
    return {
      patient: {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        reason: '',
        diagnosis: '',
        notes: '',
      },
      errors: {
        nameInvalid: false,
        addressInvalid: false,
        phoneNumberInvalid: false,
        errorAddingPatient: false,
      },
      feedback: null,
    };
  },
  methods: {
    emitCloseAddPatientCard() {
      EventBus.$emit('close-add-patient-card');
    },
    addNewPatient() {
      // TODO - Fix getting a 400 reqest error on POST
      const url = 'https://vzhny-patients-api.herokuapp.com/api/patients';
      const userLoggedIn = this.$store.getters.checkIfLoggedIn;
      const patient = {
        name: this.patient.name,
        address: this.patient.address,
        phoneNumber: this.patient.phoneNumber,
        email: this.patient.email,
        reason: this.patient.reason,
        diagnosis: this.patient.diagnosis,
        notes: this.patient.notes,
      };

      console.log('Current patient information:', patient);

      if (userLoggedIn) {
        axios
          .post(url, patient)
          .then(response => {
            console.log('Successful post:', response);
            this.$store.commit('addPatient', { patient: response.data });
          })
          .catch(error => {
            console.log('Unsuccessful post:', error);
            this.feedback = 'Error adding the patient to the server. Please try again.';
          });
      } else {
        console.log('Not logged in');
        this.feedback = 'Not currently logged in. Please log in to display your patients.';
      }
    },
  },
};
</script>

<style lang="scss">
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
</style>
