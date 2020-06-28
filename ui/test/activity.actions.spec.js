import sinonChai from "sinon-chai";
import chai from "chai";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
let mock = new MockAdapter(axios);

import constants from './../src/utils/constants';
import { actions } from "./../src/store/store"
chai.use(sinonChai);

export const testAction = (
    action,
    actionPayload,
    state,
    expectedMutations,
    done
  ) => {
    let count = 0;
    let commit = (type, payload) => {
      let mutation = expectedMutations[count];
      try {
        // check if commit function is invoked with expected args
        chai.expect(mutation.type).to.equal(type);
        if (payload) {
            chai.expect(mutation.payload).to.deep.equal(payload);
        }
        count++;
        // check if all mutations have been dispatched
        if (count >= expectedMutations.length) {
          done();
        }
      } catch (error) {
        done(error);
      }
    };
  
    if (expectedMutations.length === 0) {
      chai.expect(count).to.equal(0);
      done();
    } else {
      action({ commit, state }, actionPayload);
    }
};

describe("actions", () => {
    beforeEach(function() {
      mock.reset();
    });
  
    it("fetch activities successfully and commit", done => {
        const response = {
            data: [{id: 1, title: 'A', description: 'A', status: 'Pending'}]
        };
        mock.onGet(`${constants.apiEndpoint}/activities`).reply(200, response);
        const actionPayload = null;
        const state = null;
        const expectedMutations = [
            {
                type: 'isLoading',
                payload: true
            },
            {
                type: 'setActivities',
                payload: response
            }
        ];
        testAction(actions.fetchActivities, actionPayload, state, expectedMutations, done);
    });

    it("creates activity successfully and commit", done => {
        const body = {title: 'A', description: 'A', status: 'Pending'}
        const response = {
            data: {id: 1, title: 'A', description: 'A', status: 'Pending'}
        };
        mock.onPost(`${constants.apiEndpoint}/activities`, body).reply(201, response);
        const actionPayload = body;
        const state = null;
        const expectedMutations = [
            {
                type: 'isLoading',
                payload: true
            },
            {
                type: 'appendNewActivity',
                payload: response
            }
        ];
        testAction(actions.addNewActivity, actionPayload, state, expectedMutations, done);
    });

    it("updates activity successfully and commit", done => {
        const data = {status: 'Done', id: 1}
        const response = {
            data: {id: 1, title: 'A', description: 'A', status: 'Done'}
        };
        mock.onPut(`${constants.apiEndpoint}/activities/${data.id}/status`, {status: data.status}).reply(201, response);
        const actionPayload = data;
        const state = null;
        const expectedMutations = [
            {
                type: 'isLoading',
                payload: true
            },
            {
                type: 'updateActivity',
                payload: data
            }
        ];
        testAction(actions.changeStatus, actionPayload, state, expectedMutations, done);
    });
});