import React from 'react';
import PT from 'prop-types';
import { Row, Input, Icon } from 'react-materialize';
import * as API from '../API';

class UserLogin extends React.Component {
    state = {
        username: ''
    }

    render () {
        return (
            <div>
               <Row>
                   <form 
                   onSubmit={(event) => {
                       event.preventDefault(); 
                       this.props.getUser(this.state.username)
                       }}>
                        <Input s={7} placeholder="Username"
                        onChange={this.handleUsernameChange}
                        ><Icon>account_circle</Icon></Input>
                    </form>
                    {this.props.loggedIn ? 
                    <img class="circle valign"
                    src={`${this.props.currentUser.avatar_url}`} height="65" width="65"/> : ''} 
                </Row>
            </div>
        );
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    } 

    static propTypes = {
    
    }
}

export default UserLogin;
