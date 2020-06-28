<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item" v-if="!loading">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Title</md-table-head>
          <md-table-head>Actions</md-table-head>
        </md-table-row>

        <md-table-row v-for="activity in activities" v-bind:key="activity.id">
          <md-table-cell md-numeric>{{activity.id}}</md-table-cell>
          <md-table-cell>
            <span :style="{color: activity.color, textDecoration: activity.strikethrough? 'line-through' : 'none'}">
              <md-tooltip md-direction="top">{{activity.description}}</md-tooltip>
              {{activity.title}}
            </span>
          </md-table-cell>
          <md-table-cell>
              <md-button v-on:click="changeStatus(activity, 'InProgress')" v-if="activity.status == 'Pending'" class="md-raised">In Progress</md-button>
              <md-button v-on:click="changeStatus(activity, 'Done')" v-if="activity.status == 'InProgress'" class="md-raised">Done</md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item" v-if="loading" >
      <md-progress-spinner style="position: relative; margin-top: 100px; margin-left: 50%;" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'activities',
            'loading'
        ])
    },
    mounted () {
      this.fetchActivities();
    },
    methods: {
        ...mapActions([
            'fetchActivities'
        ]),
        changeStatus(activity, status) {
            this.$store.dispatch('changeStatus', {id: activity.id, status})
        } 
    }
}
</script>