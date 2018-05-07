import React from 'react';
import PT from 'prop-types';
import { Input, Button, Icon } from 'react-materialize';

class AddComment extends React.Component {
    state = {
        submit: false
    }
    
    componentWillReceiveProps(nextProps){
       if(nextProps.currentUser !== this.props.currentUser)
        this.setState({
            submit: true
        })
    }

    render () {
        return (
        <div> 
            <form> 
                <Input width="100%" placeholder="Add comment here..." type="textarea"
                onChange={this.props.handleCommentInput}
                />

                <Button onClick={this.handleGuestLoginClick}
                disabled={this.state.submit}
                waves="light" type="submit" name="action">Login as guest?
                <Icon className="material-icons left">account_circle</Icon>
                </Button>

                <Button onClick={this.handleAddCommentClick} 
                disabled={!this.state.submit}
                waves="light" type="submit" name="action">Submit
                <Icon className="material-icons right">send</Icon>
                </Button> 
            </form>    
        </div>
        );
    }

    handleAddCommentClick = (event) => {
            event.preventDefault();
            this.props.addComment(this.props.articleId, this.props.newComment)
    }

    handleGuestLoginClick = (event) => {
        event.preventDefault();
        this.props.loginUser("guest")
    }

    static propTypes = {
        articleId: PT.string.isRequired,
        newComment: PT.string.isRequired,
        handleCommentInput: PT.func.isRequired,
        addComment: PT.func.isRequired,
        loginUser: PT.func.isRequired,
        currentUser: PT.object.isRequired
    }
}

export default AddComment;