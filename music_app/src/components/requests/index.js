/*

            REQUESTS

    Aqui se escriben todas las requests a nuestra REST API

*/
const axios = require('axios');

const makeRequest = values => {
    axios.post('http://localhost:8000/users', values, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

// const http = require('http');

// const makeRequest = values => {

//     return new Promise((resolve, reject) => {
//         console.log('Llega a submit');
//     // dispatch(actions.loadUser());
    
//         console.log('Llega a funcion')
//         console.log(values)
    
//         const body = JSON.stringify({ usuario: values.emailAddress, password: values.password });
    
//         console.log('Este es el body');
//         console.log(body);
    
//         const options = {
//             hostname: 'localhost',
//             port: 4000,
//             path: '/users',
//             method: 'POST',
//             headers: {
//                 'Content-Length': Buffer.byteLength(body),
//                 'Content-Type': 'application/json',
//             },
//         }
    
//         http.request(options, res => {
//             let data = '';
//             res.on('data', chunk =>{
//                 data += chunk;
//             });
//             res.on('end', () => {
//                 let response = JSON.parse(data);
//                 console.log('RESPONSE')
//                 console.log(response);
//                 resolve(response)
//             })
//         }).write(body);
//     })
// }

export default makeRequest;


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await sleep(500) // simulate server latency
        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)