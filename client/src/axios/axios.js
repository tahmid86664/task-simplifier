import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9000'
}); // when deploy change the domain with the baseurl

export default instance;