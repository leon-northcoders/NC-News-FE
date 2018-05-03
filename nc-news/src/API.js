import axios from 'axios';

export const getArticles = () => {
    return axios.get("https://northcoders-news-api.herokuapp.com/api/articles")
        .then(res => res.data.articles)
    }

export const getArticlesByTopic = (topicId) => {
    return axios.get(`https://northcoders-news-api.herokuapp.com/api/topics/${topicId}/articles`)
        .then(res => res.data.article)
}    