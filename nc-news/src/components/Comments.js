import React from 'react';
import PT from 'prop-types';
import { Card, CardTitle, CardPanel, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
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
        console.log(this.state.comments)
        return (
            <div>
                <Comment addComment={this.addComment} handleAddComment={this.handleAddComment} newComment={this.state.newComment}/>
                {this.state.comments.map(comment => {
                    return (
                        <div>
                            <CardPanel>
                                <img class="circle" height="60" width="60" src={`${comment.created_by.avatar_url}`}></img>
                                {`${comment.created_by.name}: ${comment.body}`}
                            </CardPanel>    
                        </div>    
                    );
                })}
            </div>
        );
    }

    handleAddComment = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    addComment = (articleId, comment) => {
        const body = {
            body: comment,
            created_by: this.props.currentUser._id
        }
        console.log(body)
        console.log(this.props.articleId)
        API.postComment(this.props.articleId, body)
        this.setState({
            comments: [...this.state.comments, body]
        })
    }

    static propTypes = {
    
    }
}

export default Comments;