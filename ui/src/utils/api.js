import constants from './constants';
import axios from 'axios';

export default {
    get(url) {
        return axios.get(`${constants.apiEndpoint}${url}`);
    },
    post(url, body) {
        return axios.post(`${constants.apiEndpoint}${url}`, body);
    },
    put(url, body) {
        return axios.put(`${constants.apiEndpoint}${url}`, body);
    }
}