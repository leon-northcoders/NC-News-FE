import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle } from 'react-materialize';
import { Link } from 'react-router-dom';

function Articles ({ articles, match, searchTerm }) {
    const topic = match.params.topic_id;
    let displayArticles = articles.filter(article => topic ? article.belongs_to === topic : true)
    if(searchTerm) displayArticles = articles.filter((article) => {
        if(article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.body.toLowerCase().includes(searchTerm.toLowerCase()))
        return true
        else return false;
    })

    return (
        <div>
            {displayArticles.map((article, i) => {
                return (
                    <div>
                        <Card key={article._id} className='small'
                            header={<CardTitle className="card-panel light-blue accent-1" image=''>{article.title}</CardTitle>}
                            actions={[<Link className="red-text lighten-2" to={`/articles/${article._id}`}>Read More...</Link>]}>
                            {Array.from(article.body).slice(0, 400).join('') + '...'}
                        </Card> 
                    </div>
                );
            })}
        </div>
    );
}

Articles.propTypes = {
    
}

export default Articles;