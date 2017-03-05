import React from 'react';
import PlayerForm from './PlayerForm';

class GameForm extends React.Component {
  state = { playerIds: [], holes: 18, showAddPlayer: false };

  togglePlayerIdToGame = (id) => {
    if (this.state.playerIds.indexOf(id) > -1) {
      this.setState({ playerIds: this.state.playerIds.filter( p => p !== id ) })
    } else {
      this.setState({ playerIds: [...this.state.playerIds, id] })
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: '/games',
      type: 'POST',
      data: { playerIds: this.state.playerIds, holes: this.state.holes }
    }).done( game => {
      console.log(game);
      // document.getElementById('gameForm').reset();
      this.props.startGame(game)
    });
  }

  toggleAddPlayer = () => {
    this.setState({ showAddPlayer: !this.state.showAddPlayer })
  }

  render() {
    const players = this.props.players || [];
    const playersList = players.map( player => {
      const active = this.state.playerIds.indexOf(player._id) > -1;
      const style = { background: `url(${player.image}) no-repeat 50% 50%/cover` };
      return (
        <div className="flexChild" key={player._id}>
          <div
            className={`picture ${active ? 'active' : ''}`}
            style={ style }
            onClick={() => this.togglePlayerIdToGame(player._id)}
          ></div>
        </div>
      )
    });

    return (
      <div>
        <h1>New Game</h1>
        <div className="players rowParent">
          { playersList }
          <div className="flexChild">
            <div className="picture" onClick={this.toggleAddPlayer}>+</div>
          </div>
        </div>
        {this.state.showAddPlayer && <PlayerForm getPlayers={this.getPlayers} />}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="holes"
            defaultValue={this.state.holes}
            onChange={this.handleChange}
          />
          <button className="btn" type="submit">Start Game</button>
        </form>
      </div>
    );
  }
};

export default GameForm;
