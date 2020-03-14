/*

            REQUESTS

    Aqui se escriben todas las requests a nuestra REST API

*/
const axios = require('axios');

const makeRequest = (values, res) => {

    axios.post('http://localhost:8000/users', values, {})
      .then(function (response) {
        res(response.data)
      })
      .catch(function (error) {
        res(error.data)
      });

}

export default makeRequest;