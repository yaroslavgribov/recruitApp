import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://recruitappdev.herokuapp.com/'
});

export default instance;