import React from 'react';
import { Button, Icon } from 'react-materialize';
import PT from 'prop-types';

class Vote extends React.Component {
    render(){
        return (
            <div>
                <Button onClick={this.handleVoteClick} value="VOTE=UP" waves='light' flat><Icon>arrow_upward</Icon></Button>
                <h4>{this.props.article.votes}</h4>
                <Button onClick={this.handleVoteClick} value="VOTE=DOWN" waves='light' flat><Icon>arrow_downward</Icon></Button>
            </div>
        );
    }

    handleVoteClick = (event) => {
            event.preventDefault()
            this.props.changeVote(this.props.article._id, event.target.value)
        }
    }


Vote.propTypes = {
    article: PT.object.isRequired
}

export default Vote;