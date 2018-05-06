import React from 'react';
import PT from 'prop-types';
import { Input, Button } from 'react-materialize';

class Comment extends React.Component {
    render () {
        return (
        <div> 
            <form> 
                <Input width="100%" placeholder="Add comment here..." type="textarea"
                onChange={this.props.handleCommentInput}
                />
                <Button onClick={this.handleAddCommentClick} 
                waves="light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
                </Button>
            </form>    
        </div>
        );
    }

    handleAddCommentClick = (event) => {
        event.preventDefault();
        this.props.addComment(this.props.articleId, this.props.newComment)
    }

    static propTypes = {
        articleId: PT.string.isRequired,
        newComment: PT.string.isRequired,
        handleCommentInput: PT.func.isRequired,
        addComment: PT.func.isRequired
    }
}

export default Comment;