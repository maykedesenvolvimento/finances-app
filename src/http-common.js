import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
    baseURL: 'https://finances-api-md.herokuapp.com/',
    headers: {
        'Content-type': 'application/json',
    },
});