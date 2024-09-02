import axios from 'axios'


export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

export const apiSC = axios.create({
    baseURL: 'https://6c09-36-85-221-72.ngrok-free.app/'
})