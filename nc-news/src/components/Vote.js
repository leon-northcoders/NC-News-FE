import React from 'react';
import { Button, Icon } from 'react-materialize';
import PT from 'prop-types';

function Vote ({ votes }) {
    return (
        <div>
            <Button waves='light' flat><Icon>arrow_upward</Icon></Button>
            <h4>{votes}</h4>
            <Button waves='light' flat><Icon>arrow_downward</Icon></Button>
        </div>
    );

    // handleVote = () => {
        
    // }
}


Vote.propTypes = {
    votes: PT.number.isRequired
}

export default Vote;