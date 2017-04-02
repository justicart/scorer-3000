import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteGame } from '../actions/games';

class GamesList extends React.Component {
  deleteGame = (id) => {
    let { dispatch } = this.props;
    dispatch(deleteGame(id));
  }

  render() {
    const user = this.props.user || {};
    const isAdmin = user.role === 'admin';
    const games = this.props.games || {};
    const players = this.props.players || {};
    const gamesList = games.map( game => {
      const { playerIds = [] } = game;
      const playerPics = players.filter( p => {
        return playerIds.indexOf(p._id) > -1;
      }).map(player => {
        const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
        return (
          <div key={player._id} style={playerStyle} className="circle"></div>
        )
      })
      return (
        <li key={game._id} className="collection-item">
          <div>
            <Link to={`/games/${game._id}`}>{ game.name }</Link>
            <span className="secondary-content">
              {playerPics}
              {isAdmin && <span>
                <Link onClick={() => this.deleteGame(game._id)}>
                  <i className="red-text material-icons">delete</i>
                </Link>
              </span>}
            </span>
          </div>
        </li>
      )
    })

    return (
      <div className="col s12">
        <ul className="collection">
          {gamesList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return {
   games: state.games,
   user: state.user,
   players: state.players,
 }
}

export default connect(mapStateToProps)(GamesList);
