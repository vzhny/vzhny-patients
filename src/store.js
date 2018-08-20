import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable no-shadow */
const state = {
  token: null,
  patients: [],
};

const mutations = {
  currentlyLoggedIn(state, payload) {
    state.token = payload.token;
  },
  listOfPatients(state, payload) {
    payload.patients.forEach(patient => {
      state.patients.push(patient);
    });
  },
  addPatient(state, payload) {
    const { patient } = payload;
    state.patients.push(patient);
  },
};

const actions = {};

const getters = {
  checkIfLoggedIn: state => state.token !== null,
  retrieveAuthToken: state => (state.token !== null ? state.token : null),
  retrievePatients: state => state.patients,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
