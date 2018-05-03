import React from 'react';
import PT from 'prop-types';

function Button ({text}) {
    return (
        <span>
            <button> 
            {text}
            </button>
        </span>
    );

    function handleClick (event) {
        onClick(event);
    }
}

Button.propTypes = {
    onClick : PT.func.isRequired,
    text : PT.string.isRequired
}

export default Button;