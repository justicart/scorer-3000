import React from 'react';
import Nav from '../components/Nav';
import GameForm from '../components/GameForm';
import GameList from '../components/GameList';
import Game from '../components/game/Game';

class App extends React.Component {
  state = { games: [], playGame: false, activeGame: '', players: [] }

  componentDidMount() {
    this.getPlayers();
    this.getGames();
  }

  getPlayers = () => {
    $.ajax({
      url: '/players',
      type: 'GET'
    }).done( players => {
      console.warn(players);
      this.setState({ players });
    });
  }

  getGames = () => {
    $.ajax({
      url: '/games',
      type: 'GET'
    }).done( games => {
      this.setState({ games });
    });
  }

  updateGamesList = () => {
    $.ajax({
      url: '/games',
      type: 'GET'
    }).done( games => {
      this.setState({ games });
    });
  }

  deleteGame = (id) => {
    $.ajax({
      url: `/games/${id}`,
      type: 'DELETE'
    }).done( () => {
      this.updateGamesList();
    });
  }

  startGame = (game) => {
    this.setState({ playGame: true, activeGame: game })
  }

  render() {
    const playGame = this.state.playGame;
    return (
      <div>
        <Nav />
        <div className="container">
          {!playGame && <div>
            <GameForm startGame={this.startGame} players={this.state.players} getPlayers={this.getPlayers} />
            <GameList games={this.state.games} startGame={this.startGame} deleteGame={this.deleteGame} />
          </div>}
          {playGame && <Game game={this.state.activeGame} players={this.state.players} />}
        </div>
      </div>
    );
  }
};

export default App;
