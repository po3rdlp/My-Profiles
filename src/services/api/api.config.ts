import axios from 'axios'

export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

// Production
export const apiSC = axios.create({
    baseURL: 'https://dummyjson.com/',
})

apiSC.interceptors.request.use((config) => {
  if (process.client) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const apiSCAuth = axios.create({
    baseURL: 'https://dummyjson.com/'
})

// development api
// export const apiSC = axios.create({
//   baseURL: 'http://localhost:3500/',
// })

// export const apiSCAuth = axios.create({
//     baseURL: 'http://localhost:3500/'
// })

// apiSC.interceptors.request.use((config) => {
//   if (process.client) {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });



