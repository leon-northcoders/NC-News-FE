import React from 'react';
import PT from 'prop-types';
import { Input } from 'react-materialize';

class Comment extends React.Component {
    render () {
        return (
        <div> 
            <form> 
                <Input width="100%" placeholder="Add comment here..." type="textarea"
                onChange={this.props.handleAddComment}
                />
                <button onClick={(event) => {
                    event.preventDefault();
                    this.props.addComment(this.props.articleId, this.props.newComment)
                }}
                className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
                </button>
            </form>    
        </div>
        );
    }

    static propTypes = {
        articlesId: PT.string.isRequired,
        newComment: PT.string.isRequired,
        handleAddComment: PT.func.isRequired,
        addComment: PT.func.isRequired
    }
}

export default Comment;