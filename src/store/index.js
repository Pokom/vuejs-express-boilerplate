import Vue from 'vue';
import Vuex from 'vuex';
import { state } from './state';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import register from './modules/register';
import createLogger from '../../src/plugins/logger';
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  modules: {
    registerUser: register
  },
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
