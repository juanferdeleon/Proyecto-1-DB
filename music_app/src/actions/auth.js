import * as types from '../types/auth';

export const loadUser = () => ({
    type: types.USER_LOADING
})

// export const validateCredentials = async (user, password) => {

//     const body = JSON.stringify({ usuario: user, password: password });
//     const options = {
//         hostname: 'localhost',
//         port: 3000,
//         path: '/users',
//         method: 'POST',
//         headers: {
//             'Content-Length': Buffer.byteLength(body),
//             'Content-Type': 'application/json',
//         },
//     }

//     http.request(options, res => {
        
//         let data = '';
//         res.on('data', chunk =>{
//             data += chunk;
//         });
//         res.on('end', () => {
//             let request = JSON.parse(data);
//             console.log(request);
//         })
//     }).write(body);

//     return 
// }

export const registerUser = (action) => {
    
    return {
        ...action
    }
    
}