import axios from "axios";

const api = axios.create({
    baseURL: 'https://plataform-contacts.cyclic.app',
    timeout: 10000
});


export default api