import React from 'react';
import PT from 'prop-types';
import { Input } from 'react-materialize';
import * as API from '../API';

class Comment extends React.Component {
    render () {
        return (
            <div> 
        <form> 
            <Input width="100%"placeholder="Add comment here..."type="textarea"
            onChange={this.props.handleAddComment}
            />
            <button onClick={(event) => {
                event.preventDefault();
                this.props.addComment(this.props.articleId, this.props.newComment)
            }}
            class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
            </button>
        </form>    
    </div>
        );
    }

    static propTypes = {
    
    }
}

export default Comment;