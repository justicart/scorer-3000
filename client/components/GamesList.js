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
    const gamesList = games.map( game => {
      return (
        <li key={game._id} className="collection-item">
          <div>
            { game.name }
            {isAdmin && <span className="secondary-content">
              <Link to={`/games/${game._id}`}>
                <i className="material-icons">mode_edit</i>
              </Link>
              <Link onClick={() => this.deleteGame(game._id)}>
                <i className="red-text material-icons">delete</i>
              </Link>
            </span>}
          </div>
        </li>
      )
    })

    return (
      <div className="row">
        <ul className="collection col s12">
          {gamesList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return {
   games: state.games,
   user: state.user
 }
}

export default connect(mapStateToProps)(GamesList);
