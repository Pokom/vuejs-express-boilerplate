import register from '../../api/register';
import * as types from '../mutation.types';
const { UPDATE_USER, REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } = types;
const state = {
  password: '',
  username: '',
  confirmPassword: '',
  registerUserStatus: null,
  errorMessage: ''
};

const getters = {
  registerUserStatus: state => state.registerUserStatus,
  registerUser: state => state,
  errorMessage: state => state.errorMessage
};

const actions = {
  registerUser ({ commit, state }) {
    const previousUserInfo = { ...state };
    commit(REGISTER_USER);
    register.registerUser(
      previousUserInfo,
      () => commit(REGISTER_USER_SUCCESS),
      (message) => commit(REGISTER_USER_FAILURE, { message, previousUserInfo })
    );
  },
  updateUser ({ commit, state }, updateItem) {
    Object.keys(updateItem).forEach((key) => {
      commit(UPDATE_USER, { key, value: updateItem[key] });
    });
  },
  getUser ({ commit }) {
    commit(UPDATE_USER, { state });
  }
};

const mutations = {
  [UPDATE_USER] (state, updateItem) {
    const { key, value } = updateItem;
    state[key] = value;
  },
  [REGISTER_USER] (state, registerUser) {
    state = { ...registerUser };
  },
  [REGISTER_USER_SUCCESS] (state) {
    state.registerUserStatus = 'successful';
  },
  [REGISTER_USER_FAILURE] (state, { message, previousUserInfo }) {
    state.registerUserStatus = 'failed';
    state.errorMessage = message;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
