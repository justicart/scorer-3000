import React from 'react';
import Hole from './Hole';

class Game extends React.Component {
  render() {
    return (
      <div>
        {this.props.game.name}
        <Hole game={this.props.game} players={this.props.players} />
      </div>
    );
  }
};

export default Game;
