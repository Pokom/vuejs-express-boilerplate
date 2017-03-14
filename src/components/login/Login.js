export default {
  name: 'login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    submit () {
      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      };
      this.$auth.login(credentials, 'dashboard').then((response) => {
        utils.handleError(this, response);
      });
    }
  }
};
