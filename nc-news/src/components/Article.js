import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle, Row, Col, Chip } from 'react-materialize';
import Comments from './Comments';
import Vote from './Vote';
import * as API from '../API';

class Article extends React.Component {
    state = {
        article: {}
    }

    componentDidMount(){
       const article = this.props.articles.find(article => article._id === this.props.match.params.article_id)
            this.setState({
                article
            })
    }

    render(){
    const { articles, match } = this.props;
    const articleId = match.params.article_id; 
    const article = articles.find(article => article._id === articleId)
    return (
        <div>
            <Card className='small'
                header={<CardTitle className="card-panel light-blue accent-1" image=''>{article.title}</CardTitle>}>
                <Row>
                    <Col s={2}>
                        <Vote article={this.state.article} changeVote={this.changeVote}/>
                    </Col>
                    <Col s={10}>{article.body}</Col>
                </Row>    
                <Row>
                    <Col s={2}>
                        <Chip><img className="circle" alt={''}
                            src={`${article.created_by.avatar_url}`} height="30" width="30"/>
                            {article.created_by.name}
                        </Chip>
                    </Col>
                </Row>
            </Card> 
            <Comments articleId={article._id} article={article} currentUser={this.props.currentUser} 
                      loginUser={this.props.loginUser}/> 
        </div>
        );
    }

    changeVote = (articleId, query) => {
        API.updateArticleVote(articleId, query)
            .then(updatedArticle => {
                this.setState({
                    article: updatedArticle
                })
            })
    }

    static propTypes = {
        articles: PT.array.isRequired,
        match: PT.object.isRequired,
        currentUser: PT.object.isRequired,
        loginUser: PT.func.isRequired
    }
}

export default Article;