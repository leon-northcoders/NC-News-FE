import React from "react";
import { Button, Icon } from "react-materialize";
import PT from "prop-types";

class Like extends React.Component {
  render() {
    return (
      <div>
        <Button
          onClick={this.handleLikeClick}
          value="VOTE=UP"
          waves="light"
          flat
        >
          <Icon>thumb_up</Icon>
        </Button>
        <Button
          onClick={this.handleLikeClick}
          value="VOTE=DOWN"
          waves="light"
          flat
        >
          <Icon>thumb_down</Icon>
        </Button>
      </div>
    );
  }

  handleLikeClick = event => {
    event.preventDefault();
    this.props.changeLike(this.props.comment._id, event.target.value);
  };

  static propTypes = {
    comment: PT.object.isRequired,
    changeLike: PT.func.isRequired
  };
}

export default Like;
