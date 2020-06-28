<template>
  <div>
    <md-snackbar :md-position="position" :md-duration="Infinity" :md-active.sync="showErrorPopup" md-persistent>
      <span>Error requesting to server. Try again!</span>
      <md-button class="md-primary" v-on:click="closeErrorPopup">Ok!</md-button>
    </md-snackbar>
    <activity-form></activity-form>
    <activity-list></activity-list>
  </div>
</template>

<script>
import ActivityForm from './activity/Form.vue'
import ActivityList from './activity/List.vue'

import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
  name: 'Activity',
  data: () => ({
    position: 'left'
  }),
  components: {
    'activity-form': ActivityForm,
    'activity-list': ActivityList
  },
  computed: {
    ...mapGetters([
      'showErrorPopup'
    ])
  },
  methods: {
    ...mapActions([
      'closeErrorPopup'
    ]), 
  }
}
</script>