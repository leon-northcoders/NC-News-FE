import React from 'react';
import PT from 'prop-types';
import { Row, Col } from 'react-materialize'; 

function Search ({ onSearchChange }) {
        return (
            <div>
            <Row>
              <Col 
              s={8}><input onChange={onSearchChange} />
              <label for="icon_prefix">Search</label>
              </Col>
            </Row>  
        </div>
        );
    }

    Search.propTypes = {
}

export default Search;