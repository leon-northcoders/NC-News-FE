import React from 'react';
import PT from 'prop-types';
import { Row, Input, Icon } from 'react-materialize'; 

function Search ({ onSearchChange }) {
        return (
        <div>
            <Row>
                <Input s={8} placeholder="Search" onChange={onSearchChange}><Icon>search</Icon></Input>
            </Row>  
        </div>
        );
    }

    Search.propTypes = {
        onSearchChange: PT.func.isRequired
}

export default Search;