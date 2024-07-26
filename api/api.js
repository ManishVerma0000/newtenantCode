import axios from "axios";
const api = axios.create({
// /http://192.168.205.211:7000
//http://192.168.0.100:7000
// /http://15.207.39.254:7000
    baseURL: 'http://192.168.0.100:7000/api',
    // withCredentials: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    },


});


export default api;