import axios from 'axios'


export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

export const apiSC = axios.create({
    baseURL: 'http://localhost:3500/'
})