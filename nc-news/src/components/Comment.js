import React from 'react';
import PT from 'prop-types';
import { Card, Chip, Row, Col, Icon, Button } from 'react-materialize';
import Like from './Like';
import moment from 'moment';
import * as API from '../API';

class Comment extends React.Component {
    state = {
        likes: this.props.comment.votes
    }

    render () {
        const { comment } = this.props
        return (
            <div>
                <Card key={this.props}
                actions={[ 
                <Row>
                    <Col s={7}>   
                        <Chip>
                            {`Posted ${moment(comment.created_at).fromNow()}`}
                        </Chip> 
                    </Col>
                    <Col s={2}>
                        <Chip><Icon>favorite_border</Icon>
                            {this.state.likes}
                        </Chip>
                    </Col>
                    <Col s={3}>
                        <Like comment={comment} changeLike={this.changeLike}/>
                    </Col>
                </Row>  ]}>
                    <Row>
                        <Col s={3}>
                            <Chip><img className="circle" alt=''
                                src={`${comment.created_by.avatar_url}`} height="50" width="50"/>
                                {comment.created_by.username}
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
                    </Card>   
                </div>   
        );
    }

    deleteComment = (commentId) => {
        API.deleteComment(commentId)
    }

    changeLike = (commentId, query) => {
        API.updateCommentVote(commentId, query)
            .then(updatedComment => {
                this.setState({
                    likes: updatedComment.votes
                })
            })

    }

    static propTypes = {
        comment: PT.object.isRequired,
        currentUser: PT.object.isRequired,
        articleId: PT.string.isRequired
    }
}

export default Comment;