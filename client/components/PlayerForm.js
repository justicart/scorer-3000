import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addPlayer, deletePlayer } from '../actions/players';

class PlayerForm extends React.Component {
  state = { name: '', picture: '' };
  deletePlayer = (id) => {
    let { dispatch } = this.props;
    dispatch(deletePlayer(id));
  }

  handleChange = (e) => {
    const { target: { id, value } } = e;
    this.setState({ [id]: value });
  }

  render() {
    const user = this.props.user || {};
    const isAdmin = user.role === 'admin';
    const { name, picture } = this.state;
    let { dispatch } = this.props;
    const playerList = this.props.players.map( player => {
      const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
      return (
        <li key={player._id} className="collection-item avatar">
          <div style={playerStyle} className="circle"></div>
          <span className="title">{ player.name }</span>
          <p>Stats here</p>
          {isAdmin && <span className="secondary-content">
            <Link to={`/player/${player._id}`}>
              <i className="material-icons">mode_edit</i>
            </Link>
            <Link onClick={() => this.deletePlayer(player._id)}>
              <i className="red-text material-icons">delete</i>
            </Link>
          </span>}
        </li>
      )
    });

    return (
      <div className="row">
        <div className="col s12 m6">
          <form
            onSubmit={ e => {
              e.preventDefault();
              dispatch(addPlayer(name, picture));
              this.setState({ name: '', picture: '' });
            }}
          >
            <input
              id="name"
              className="white-text"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
              placeholder="Player Name"
            />
            <input
              id="picture"
              className="white-text"
              name="image"
              type="text"
              value={picture}
              onChange={this.handleChange}
              placeholder="Player Picture URL"
            />
            <button className="btn" type="submit">Add Player</button>
          </form>
        </div>
        <div className="col s12 m6">
          <ul className="collection">
             { playerList.length ?
                 playerList :
                 <li className="collection-item">Add Players To Get started</li>
             }
          </ul>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
 return {
   players: state.players,
   user: state.user
  }
}

export default connect(mapStateToProps)(PlayerForm);
