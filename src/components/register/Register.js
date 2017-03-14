import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapGetters, mapActions } from 'vuex';

Vue.use(VeeValidate);

VeeValidate.Validator.extend('passphrase', {
  getMessage: field => `${field} is incorrect`,
  validate: value => value.toUpperCase() === 'Demogorgon'.toUpperCase()
});

export default {
  name: 'register',
  computed: {
    username: {
      get () {
        return this.$store.state.registerUser.username;
      },
      set (value) {
        return this.$store.dispatch('updateUser', { 'username': value });
      }
    },
    password: {
      get () {
        return this.$store.state.registerUser.password;
      },
      set (value) {
        return this.$store.dispatch('updateUser', { 'password': value });
      }
    },
    confirmPassword: {
      get () {
        return this.$store.state.registerUser.confirmPassword;
      },
      set (value) {
        return this.$store.dispatch('updateUser', { 'confirmPassword': value });
      }
    },
    hasError: false,
    ...mapGetters({ errorMessage: 'errorMessage', registerUserStatus: 'registerUserStatus' })
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser',
      getUser: 'getUser'
    }),
    validateBeforeSubmit (e) {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        this.submitForm();
      }
    },
    submitForm () {
      this.$store.dispatch('registerUser')
        .then((user) => this.handleSuccess(user))
        .catch(() => this.handleError());
    },
    handleSuccess (user) {
      this.$store.dispatch('registerUserStatus');
    },
    handleError () {
      this.$store.dispatch('errorMessage');
    },
    passwordConfirm (value) {
      return false;
    }
  }
};
