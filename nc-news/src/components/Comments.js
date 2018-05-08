import React from 'react';
import PT from 'prop-types';
import { Row, Col,ProgressBar } from 'react-materialize';
import AddComment from './AddComment';
import Comment from './Comment';
import * as API from '../API';

class Comments extends React.Component {
    state = {
        comments: [],
        newComment: '',
        loading: true
    }

    componentDidMount(){
        API.getComments(this.props.articleId)
            .then(comments => {
                const sortedComments = comments.slice().sort((a, b) => a.created_at - b.created_at)
                this.setState({
                comments: sortedComments,
                loading: false
                })
            }) 
        }

    componentDidUpdate(prevProps, prevState){
            API.getComments(this.props.articleId)
                .then(comments => {
                    const sortedComments = comments.slice().sort((a, b) => a.created_at - b.created_at)
                    if(sortedComments.length !== this.state.comments.length)
                    this.setState({
                        comments: sortedComments
                    })
                })
    
    }    

    render () {
        return this.state.loading ?
            <Row>
                <Col s={12}>
                    <ProgressBar />
                </Col>
            </Row> : (
            <div>
                {this.state.comments.map((comment,i) => {
                    return (
                         <Comment comment={comment} currentUser={this.props.currentUser} articleId={this.props.articleId}/>
                    );
                })}
                <AddComment addComment={this.addComment} handleCommentInput={this.handleCommentInput} 
                            newComment={this.state.newComment} articleId={this.props.articleId}
                            currentUser={this.props.currentUser} loginUser={this.props.loginUser}/>
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
            created_by: this.props.currentUser._id
        }
        API.postComment(articleId, body)
    }


    static propTypes = {
        articleId: PT.string.isRequired,
        currentUser: PT.object.isRequired,
        loginUser: PT.func.isRequired
    }
}

export default Comments;