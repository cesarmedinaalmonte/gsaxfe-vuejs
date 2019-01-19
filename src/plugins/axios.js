import axios from 'axios';

// const baseURL = 'http://gsax-app.local/app_dev.php/';
const baseURL = 'http://104.196.4.97:8000/app_dev.php';



export default axios.create({
    baseURL: baseURL,
    // headers: { 'Authorization': "bearer " + token }
});