import axios from 'axios';

const baseURL = 'http://35.236.244.72:8000/api';

export default axios.create({
    baseURL: baseURL,
    // headers: { 'Authorization': "bearer " + token }
});