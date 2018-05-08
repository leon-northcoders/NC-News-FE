import React from "react";
import PT from "prop-types";
import { Row, Input, Icon, Button, Col } from "react-materialize";

class UserLogin extends React.Component {
  state = {
    username: ""
  };

  render() {
    return (
      <div>
        <Row>
          <Col s={8}>
            <Input
              placeholder="Username"
              onChange={this.handleUsernameChange}
              onKeyDown={event => {
                if (event.keyCode === 13)
                  this.props.loginUser(this.state.username);
              }}
            >
              {this.props.loggedIn ? (
                <Icon>
                  <img
                    className="circle"
                    alt={this.props.currentUser.name}
                    src={`${this.props.currentUser.avatar_url}`}
                    height="30"
                    width="30"
                  />
                </Icon>
              ) : (
                <Icon>account_circle</Icon>
              )}
            </Input>
          </Col>
          {this.props.currentUser.name ? (
            <Col s={2}>
              <Button
                onClick={event => {
                  event.preventDefault();
                  this.props.logoutUser();
                }}
                className="log-out"
                waves="light"
                flat
              >
                X
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>
    );
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  static propTypes = {
    loginUser: PT.func.isRequired,
    currentUser: PT.object.isRequired,
    logoutUser: PT.func.isRequired
  };
}

export default UserLogin;
