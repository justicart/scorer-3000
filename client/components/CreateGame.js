import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addGame } from '../actions/games';

class CreateGame extends React.Component {
  state = { playerIds: [], holes: 18 };

  togglePlayerIdToGame = (id) => {
    if (this.state.playerIds.indexOf(id) > -1) {
      this.setState({ playerIds: this.state.playerIds.filter( p => p !== id ) })
    } else {
      this.setState({ playerIds: [...this.state.playerIds, id] })
    }
  }

  render() {
    const playerList = this.props.players.map( player => {
      const active = this.state.playerIds.indexOf(player._id) > -1;
      const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
      return (
        <a
          key={player._id}
          className={`collection-item avatar ${active ? 'active' : ''}`}
          onClick={() => this.togglePlayerIdToGame(player._id)}
        >
          <div style={playerStyle} className="circle"></div>
          <span className="title">{ player.name }</span>
          <p>Stats here</p>
          {active && <span className="secondary-content">
            <i className="material-icons">done</i>
          </span>}
        </a>
      )
    });

    return (
      <div>
        <div className="collection col s12 m6">
          { playerList.length ?
            playerList :
            <div className="collection-item">Add players in <Link to={'/settings'}>settings</Link></div>
          }
        </div>
        <form
          onSubmit={ e => {
          e.preventDefault();
          this.props.dispatch(addGame(this.props.router, this.state.playerIds));
          }}
        >
          <button className="btn">Start Game</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
 return { players: state.players }
}

export default connect(mapStateToProps)(CreateGame);
