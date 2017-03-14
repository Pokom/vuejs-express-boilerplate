<template>
  <div class="input-group add-on">
      <input v-model="search"class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" @keyup.enter="submit" @keyup="handleKeypress">
      <div class="input-group-btn" v-if="!typeahead">
        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    handler: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Type here to search'
    },
    typeahead: {
      type: String,
      default: null
    }
  },
  methods: {
    submit: function (event) {
      if (this.search === '') {
        return;
      }
      this.$store.dispatch(this.handler, this.search);
    },
    handleKeypress: function (event) {
      if (!this.typeahead) {
        return;
      }
      this.submit();
    }
  },
  data () {
    return {
      search: ''
    };
  }
};
</script>

<style lang="css" scoped>
</style>
