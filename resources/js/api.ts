import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.withCredentials = true;
// not necessary for same origin
// instance.defaults.withXSRFToken = true;

export default instance;
