import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addPlayer, deletePlayer } from '../actions/players';

class PlayerForm extends React.Component {
  deletePlayer = (id) => {
    let { dispatch } = this.props;
    dispatch(deletePlayer(id));
  }

  render() {
    const user = this.props.user || {};
    const isAdmin = user.role === 'admin';
    let name;
    let image;
    let form;
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
            ref={ n => form = n }
            onSubmit={ e => {
              e.preventDefault();
              dispatch(addPlayer(name.value, image.value));
              form.reset();
            }}
          >
            <input className="white-text" name="name" type="text" ref={ n => name = n } placeholder="Player Name" />
            <input className="white-text" name="image" type="text" ref={ n => image = n } placeholder="Player Picture URL" />
            <button className="btn" type="submit">Add Player</button>
          </form>
        </div>
        <ul className="collection col s12 m6">
           { playerList.length ?
               playerList :
               <li className="collection-item">Add Players To Get started</li>
           }
        </ul>
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
