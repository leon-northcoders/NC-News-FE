import React from 'react';
import PT from 'prop-types';
import { Row, Input, Icon } from 'react-materialize';

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
                    this.props.loginUser(this.state.username)
                    }}>
                    <Input s={7} placeholder="Username"
                    onChange={this.handleUsernameChange}>
                    {this.props.loggedIn ?
                        <Icon><img className="circle" alt={this.props.currentUser.name}
                        src={`${this.props.currentUser.avatar_url}`} height="30" width="30"/></Icon> :
                        <Icon>account_circle</Icon>}
                    </Input>
                    </form>
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
        loginUser: PT.func.isRequired,
        currentUser: PT.object.isRequired
    }
}

export default UserLogin;
