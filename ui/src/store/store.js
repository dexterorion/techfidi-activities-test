import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import { activitiesApi } from './../api/activities'

Vue.use(Vuex);

export const mutations = {
    isLoading: (state, payload) => {
        state.loading = payload;
    },
    setActivities: (state, payload) => {
        state.activities = payload.data;
        state.loading = false;
    },
    appendNewActivity: (state, payload) => {
        state.activities = _.concat(state.activities, [payload.data]);
        state.loading = false;
    },
    updateActivity: (state, payload) => {
        let activity = _.find(state.activities, activity => activity.id == payload.id)
        if (activity) {
            activity.status = payload.status
        }
        state.loading = false;
    },
    errorHappened: (state, payload) => {
        state.showErrorPopup = payload != null;
        state.loading = false;
    },
    closeErrorPopup: (state) => {
        state.showErrorPopup = false
    }
}

export const getters = {
    activities: state => {
        _.map(state.activities, activity => {
            switch(activity.status) {
                case 'Pending':
                    activity.color = 'orange';
                    break;
                case 'InProgress':
                    activity.color = 'green';
                    break;
                case 'Done':
                    activity.color = 'black';
                    activity.strikethrough = true;
                    break;
                default:
                    break;
            }
            return activity;
        })
        return state.activities
    },
    loading: state => {
        return state.loading
    },
    showErrorPopup: state => {
        return state.showErrorPopup
    }
}

export const actions = {
    fetchActivities: ({commit}) => {
        commit('isLoading', true);
        activitiesApi.fetchActivities()
            .then(response => commit('setActivities', response.data))
            .catch(error => commit('errorHappened', error))
    },
    addNewActivity: ({commit}, data) => {
        commit('isLoading', true);
        activitiesApi.addNewActivity(data)
            .then(response => commit('appendNewActivity', response.data))
            .catch(error => commit('errorHappened', error))
    },
    changeStatus: ({commit}, data) => {
        commit('isLoading', true);
        activitiesApi.changeStatus(data)
            .then(() => commit('updateActivity', {id: data.id, status: data.status}))
            .catch(error => commit('errorHappened', error))
    },
    closeErrorPopup: ({commit}) => {
        commit('closeErrorPopup');
    }
}

export const store = new Vuex.Store({
    strict: true,
    state: {
        activities: [],
        loading: false,
        showErrorPopup: false
    },
    getters,
    mutations,
    actions
});