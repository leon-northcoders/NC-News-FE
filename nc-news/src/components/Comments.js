import React from 'react';
import PT from 'prop-types';
import { CardPanel, Chip, Row, Col, Icon, Button, ProgressBar } from 'react-materialize';
import AddComment from './AddComment';
import moment from 'moment';
import * as API from '../API';

class Comments extends React.Component {
    state = {
        comments: [],
        newComment: '',
        loading: true,
        guestId: ''
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
        API.getUser("Guest")
            .then(user => {
                this.setState({
                    guestId: user._id
                })
            })    
        }

    componentDidUpdate(){
        API.getComments(this.props.articleId)
            .then(comments => {
                const sortedComments = comments.slice().sort((a, b) => a.created_at - b.created_at)
                if(JSON.stringify(sortedComments) !== JSON.stringify(this.state.comments))
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
                        <div key={i}>
                            <CardPanel>
                                <Row>
                                    <Col s={3}>   
                                        <Chip>
                                            {`Posted ${moment(comment.created_at).fromNow()}`}
                                        </Chip> 
                                    </Col>
                                    <Col s={8}>
                                        {comment.body}
                                    </Col>
                                    {this.props.currentUser.name === comment.created_by.name ? 
                                    <Col s={1}>
                                        <Button onClick={(event) =>{ 
                                            event.preventDefault()
                                            this.deleteComment(comment._id)}} 
                                            waves="light" flat><Icon>close</Icon></Button>
                                    </Col> : ''}
                                </Row> 
                                <Row>
                                    <Col s={4}>
                                        <Chip><img className="circle" alt=''
                                            src={`${comment.created_by.avatar_url}`} height="50" width="50"/>
                                            {comment.created_by.username}
                                        </Chip>
                                    </Col>
                                </Row>    
                            </CardPanel>   
                        </div>    
                    );
                })}
                <AddComment addComment={this.addComment} handleCommentInput={this.handleCommentInput} newComment={this.state.newComment} articleId={this.props.articleId}/>
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
            created_by: this.props.currentUser._id || this.state.guestId
        }
        API.postComment(this.props.articleId, body)

        this.setState({
            comments: [...this.state.comments, body]
        })
    }

    deleteComment = (commentId) => {
        API.deleteComment(commentId)
    }

    getGuest = () => {
        API.getUser("Guest").then(user => user._id)
    }

    static propTypes = {
        articleId: PT.string.isRequired,
        currentUser: PT.object.isRequired
    }
}

export default Comments;