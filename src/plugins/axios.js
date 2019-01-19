import axios from 'axios';

const baseURL = 'http://' + location.hostname + ':8000/app_dev.php' ;
// const baseURL = 'http://gsax-app.local/app_dev.php' ;

console.log(location);
console.log(baseURL);

export default axios.create({
    baseURL: baseURL,
    // headers: { 'Authorization': "bearer " + token }
});