import axios from 'axios';
require('dotenv').config();

//Define a URL base da origem para consumo do servico
export default axios.create({
    baseURL: (process.env.API_URL) || 'http://localhost:3001/',
    headers: {
        'Content-type': 'application/json',
    },
});