import React from 'react';
import PT from 'prop-types';
import { CardPanel, Chip } from 'react-materialize';
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
                <Comment addComment={this.addComment} handleAddComment={this.handleAddComment} newComment={this.state.newComment}/>
                {this.state.comments.map(comment => {
                    return (
                        <div key={comment._id}>
                            <CardPanel>
                                <Chip><img className="circle" alt=''
                                        src={`${comment.created_by.avatar_url}`} height="50" width="50"/>
                                        {comment.created_by.name}
                                </Chip>
                                {comment.body}
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
            created_by: this.props.currentUser._id || "5aec866a5dd13f4c48a7d930"
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