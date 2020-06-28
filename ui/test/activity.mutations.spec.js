import { expect } from 'chai'
import { mutations } from '../src/store/store'

const { 
    isLoading, 
    setActivities, 
    appendNewActivity, 
    updateActivity, 
    errorHappened, 
    closeErrorPopup
} = mutations

describe('mutations test', () => {
    it('is loading test', () => {
        const state = { loading: false }
        isLoading(state, true)
        expect(state.loading).to.equal(true)
    })

    it('set activities test', () => {
        const state = { activities: [], loading: true }
        setActivities(state, {data: [{id: 1, title: 'A', description: 'A', status: 'Pending'}]})
        expect(state.loading).to.equal(false)
        expect(state.activities.length).to.equal(1)
        expect(state.activities[0].id).to.equal(1)
        expect(state.activities[0].title).to.equal('A')
        expect(state.activities[0].description).to.equal('A')
        expect(state.activities[0].status).to.equal('Pending')
    })

    it('append new activity test', () => {
        const state = { activities: [], loading: true }
        appendNewActivity(state, {data: {id: 1, title: 'A', description: 'A', status: 'Pending'}})
        expect(state.loading).to.equal(false)
        expect(state.activities.length).to.equal(1)
        expect(state.activities[0].id).to.equal(1)
        expect(state.activities[0].title).to.equal('A')
        expect(state.activities[0].description).to.equal('A')
        expect(state.activities[0].status).to.equal('Pending')
    })

    it('update activity test', () => {
        const state = { activities: [{id: 1, title: 'A', description: 'A', status: 'Pending'}], loading: true }
        updateActivity(state, {id: 1, status: 'Done'})
        expect(state.loading).to.equal(false)
        expect(state.activities.length).to.equal(1)
        expect(state.activities[0].id).to.equal(1)
        expect(state.activities[0].title).to.equal('A')
        expect(state.activities[0].description).to.equal('A')
        expect(state.activities[0].status).to.equal('Done')
    })

    it('error happened test', () => {
        const state = { showErrorPopup: false, loading: true }
        errorHappened(state, {error: new Error('Some error')})
        expect(state.loading).to.equal(false)
        expect(state.showErrorPopup).to.equal(true)
    })

    it('close popup test', () => {
        const state = { showErrorPopup: true }
        closeErrorPopup(state)
        expect(state.showErrorPopup).to.equal(false)
    })
})