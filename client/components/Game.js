import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = { scores: {} };

  increaseScore = (playerId) => {
    let count = 0;
    if (this.state.scores[playerId]) {
      count = this.state.scores[playerId].score + 1;
    }
    this.setState({ scores: { [playerId]: count }});
  }

  saveHole = () => {
    console.warn("save");
  }

  render() {
    let { game: { name, playerIds, holes, playedHoles } } = this.props;
    const scoring = this.props.players.filter( player => {
      return playerIds.indexOf(player._id) > -1;
    }).map( player => {
      const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
      const playerId = player._id;
      let score = 0;
      if (this.state.scores[player._id])
        score = this.state.scores[player._id].score;
      return (
        <div className="collection-item avatar" key={player._id}>
          <div style={playerStyle} className="circle"></div>
          <span className="title">{ player.name }</span>
          <p>Stats here</p>
          <div className="secondary-content score rowParent">
            <div className="btn decrease flexChild">-</div>
            <input className="flexChild" value={score} />
            <div
              className="btn increase flexChild"
              onClick={ () => this.increaseScore(player._id) }
            >+</div>
          </div>
        </div>
      )
    })
    return (
      <div>
        <form onSubmit={this.saveHole}>
          <div className="collection col s12 m6">
            { scoring }
          </div>
          <button className="btn" type="submit">Save Hole</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    game: state.games.find( g => g._id === props.params.id),
    players: state.players
  }
}

export default connect(mapStateToProps)(Game);
