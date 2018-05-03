import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle } from 'react-materialize';
import { Link } from 'react-router-dom';

function Article ({ articles, match }) {
    const articleId = match.params.article_id; 
    const article = articles.find(article => article._id === articleId)

    return (
        <div>
            <Card key={article._id} className='small'
                header={<CardTitle className="card-panel light-blue accent-1" image=''>{article.title}</CardTitle>}>
                {article.body}
            </Card> 
        </div>
  
    );
}

Article.propTypes = {
    
}

export default Article;