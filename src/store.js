import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  token: null,
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  currentlyLoggedIn(state, payload) {
    state.token = payload.token;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {};

// getters are functions
const getters = {
  checkIfLoggedIn: state => (state.token !== null ? state.token : null),
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
