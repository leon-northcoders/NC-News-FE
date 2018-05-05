import axios from 'axios';
const domain = `https://leon-nc-news.herokuapp.com/api`

export const getArticles = () => {
    return axios.get(`${domain}/articles`)
        .then(res => res.data.articles)
    }

export const getComments = (articleId) => {
    return axios.get(`${domain}/articles/${articleId}/comments`)
        .then(res => res.data.comments)
}

export const postComment = (articleId, body) => {
    return axios.post(`${domain}/articles/${articleId}/comments`, body)
}

export const getUser = (username) => {
    return axios.get(`${domain}/users/${username}`)
        .then(res => res.data.user)
}

export const updateVote = (articleId, query) => {
    return axios.put(`${domain}/articles/${articleId}/${query}`)
        .then(res => res)
}