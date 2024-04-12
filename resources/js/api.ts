import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.withCredentials = true;
// not necessary for same origin
// instance.defaults.withXSRFToken = true;

export default instance;
