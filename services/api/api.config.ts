import axios from 'axios'


export const apiGit = axios.create({
    baseURL: 'https://api.github.com/'
})

export const apiSC = axios.create({
    baseURL: 'https://a187-110-139-227-45.ngrok-free.app/'
})
