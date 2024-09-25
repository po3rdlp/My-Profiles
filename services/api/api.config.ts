import axios from 'axios'

export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

export const apiSC = axios.create({
    baseURL: 'https://petterl.xyz/simple-connect/',
})

apiSC.interceptors.request.use((config) => {
  if (process.client) { // Check if running on the client side
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
    baseURL: 'https://petterl.xyz/simple-connect/'
})


