import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const REGISTER_USER_URL = '/api/users';

export default {
  registerUser (registerUser, cb, errCb) {
    const { username, password } = registerUser;
    return Vue.http.post(REGISTER_USER_URL, { username, password })
      .then((response) => {
        cb(response);
      })
      .catch((err) => {
        const { message } = err.body;
        errCb(message);
      });
  }
};

