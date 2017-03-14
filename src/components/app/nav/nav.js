import Auth from '../../../auth';
import { mapState } from 'vuex';

export default {
  computed: mapState({
    auth: state => state.auth
  }),
  methods: {
    logout () {
      Auth.logout();
    }
  }
};

