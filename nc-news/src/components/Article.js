import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle } from 'react-materialize';
import Comments from './Comments';

function Article ({ articles, match, currentUser }) {
    const articleId = match.params.article_id; 
    const article = articles.find(article => article._id === articleId)

    return (
        <div>
            <Card className='small'
                header={<CardTitle className="card-panel light-blue accent-1" image=''>{article.title}</CardTitle>}>
                {article.body}
            </Card> 
            <Comments articleId={articleId} article={article} currentUser={currentUser}/>
        </div>
  
    );
}

Article.propTypes = {
    articles: PT.array.isRequired,
    match: PT.object.isRequired,
    currentUser: PT.object.isRequired
}

export default Article;