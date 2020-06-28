<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item content">
        <md-field :class="messageClass">
            <label>Title</label>
            <md-input v-model="title" required></md-input>
            <span class="md-error">Title is required</span>
        </md-field>
        <md-field :class="messageClass">
            <label>Description</label>
            <md-input v-model="description" required></md-input>
            <span class="md-error">Description is required</span>
        </md-field>
        <md-button style="float: right;" class="md-raised md-primary" v-on:click="addNewActivity">Add new activity</md-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        title: '',
        description: '',
        hasMessages: false
      }
    },
    computed: {
        messageClass () {
          return {
            'md-invalid': this.hasMessages
          }
        }
    },
    methods: {
        addNewActivity() {
          this.hasMessages = this.title == "" || this.description == "";
          if (!this.hasMessages) {
            this.$store.dispatch('addNewActivity', { title: this.title, description: this.description })
            this.title = '';
            this.description = '';
          }
        }
    }
}
</script>
<style scoped>
  .content {
    background-color: white;
  }
  
  .content .md-field * {
    padding-left: 10px;;
  }
</style>