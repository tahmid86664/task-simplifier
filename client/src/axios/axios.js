import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://task-simplifier.herokuapp.com'
}); // when deploy change the domain with the baseurl

export default instance;