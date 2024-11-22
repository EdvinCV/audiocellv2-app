import axios from 'axios';


/*
// Configuracion de cliente axios
export const clientToken = axios.create({
    baseURL: 'http://137.184.192.120:3001/',
    headers: {'Authorization': localStorage.getItem("access_token")}
});

export const clientTwoToken = axios.create({
    baseURL: 'http://137.184.192.120:3002/',
    headers: {'Authorization': localStorage.getItem("access_token")}
});

export const client = axios.create({
    baseURL: 'http://137.184.192.120:3001/',
});
*/

export const clientToken = axios.create({
    baseURL: 'http://206.189.200.56:3001/',
    headers: {'Authorization': localStorage.getItem("access_token")},
});

export const clientTwoToken = axios.create({
    baseURL: 'http://localhost:3002/',
    headers: {'Authorization': localStorage.getItem("access_token")}
});

export const client = axios.create({
    baseURL: 'http://206.189.200.56:3001/',
});
