import axios from 'axios';

const baseURL = 'http://gsax-app.local/app_dev.php/';

export default axios.create({
    baseURL: baseURL,
    // headers: { 'Authorization': "bearer " + token }
});