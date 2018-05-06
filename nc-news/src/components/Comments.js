import React from 'react';
import PT from 'prop-types';
import { CardPanel, Chip, Row, Col, Icon, Button } from 'react-materialize';
import Comment from './Comment';
import * as API from '../API';

class Comments extends React.Component {
    state = {
        comments: [],
        newComment: ''
    }

    componentDidMount(){
        API.getComments(this.props.articleId)
            .then(comments => {
                this.setState({
                comments
                })
            })
        }

    componentDidUpdate(){
        API.getComments(this.props.articleId)
            .then(comments => {
                if(JSON.stringify(comments) !== JSON.stringify(this.state.comments))
                this.setState({
                    comments
                })
            })
        }    

    render () {
        return (
            <div>
                <Comment addComment={this.addComment} handleCommentInput={this.handleCommentInput} newComment={this.state.newComment} articleId={this.props.articleId}/>
                {this.state.comments.map((comment,i) => {
                    return (
                        <div key={i}>
                            <CardPanel>
                                <Row>
                                    <Col s={2}>    
                                        <Chip><img className="circle" alt=''
                                            src={`${comment.created_by.avatar_url}`} height="50" width="50"/>
                                            {comment.created_by.name}
                                        </Chip>
                                    </Col>
                                    <Col s={9}>
                                        {comment.body}
                                    </Col>
                                    {this.props.currentUser.name === comment.created_by.name ? 
                                    <Col s={1}>
                                        <Button waves="light" flat><Icon>close</Icon></Button>
                                    </Col> : ''}
                                </Row> 
                            </CardPanel>   
                        </div>    
                    );
                })}
            </div>
        );
    }

    handleCommentInput = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    addComment = (articleId, comment) => {
        const body = {
            body: comment,
            created_by: this.props.currentUser._id || "5aedd01b3cdb8f8068de284d"
        }
        API.postComment(this.props.articleId, body)
        this.setState({
            comments: [...this.state.comments, body]
        })
    }

    static propTypes = {
        articleId: PT.string.isRequired,
        currentUser: PT.object.isRequired
    }
}

export default Comments;