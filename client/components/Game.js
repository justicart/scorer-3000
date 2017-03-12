import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  saveHole = () => {
    console.warn("save");
  }

  render() {
    let { game: { name, playerIds, holes, playedHoles } } = this.props;
    const scoring = this.props.players.filter( player => {
      return playerIds.indexOf(player._id) > -1;
    }).map( player => {
      const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
      return (
        <div className="collection-item avatar" key={player._id}>
          <div style={playerStyle} className="circle"></div>
          <span className="title">{ player.name }</span>
          <p>Stats here</p>
          <input className="flexChild" name={player._id} />
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
