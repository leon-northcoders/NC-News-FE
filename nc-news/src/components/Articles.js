import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle, Row, Col, Icon, Chip } from 'react-materialize';
import { Link } from 'react-router-dom';
import Vote from './Vote';

function Articles ({ articles, match, searchTerm }) {
    const topic = match.params.topic_id;
    let displayArticles = articles.filter(article => topic ? article.belongs_to.title.toLowerCase() === topic : true)
    if(searchTerm) displayArticles = articles.filter((article) => {
        if(article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.body.toLowerCase().includes(searchTerm.toLowerCase()))
        return true
        else return false;
    })

    return (
        <div>
            {displayArticles.sort((a, b) => b.votes - a.votes).map((article, i) => {
                console.log(article.votes)
                return (
                    <div key={article._id}>
                     <Card height="auto" className='small'
                        header={<CardTitle className="card-panel light-blue accent-1" image=''>{article.title}</CardTitle>}>
                        <Row>
                            <Col s={2}><Vote votes={article.votes}/></Col>
                            <Col s={2}>
                                <Chip><img className="circle" alt={''}
                                    src={`${article.created_by.avatar_url}`} height="30" width="30"/>
                                    {article.created_by.name}
                                </Chip>
                            </Col>
                            <Col s={2}><Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>{article.belongs_to.title}</Link></Col>
                            <Col s={1}><Icon>comment</Icon>{article.comments}</Col>
                            <Col s={4} className="read-more"><Link className="red-text lighten-2" to={`/articles/${article._id}`}>Read More...</Link></Col>  
                        </Row>  
                    </Card>
                    </div>
                );
            })}
        </div>
    );
}

Articles.propTypes = {
    articles: PT.array.isRequired,
    match: PT.object.isRequired,
    searchTerm: PT.string.isRequired
}

export default Articles;