import React from 'react';

class GameList extends React.Component {
  render() {
    const games = this.props.games.map( game => {
      return (
        <div className="rowParent" key={game._id}>
          <div className="flexChild shrink" onClick={() => this.props.deleteGame(game._id)}>X</div>
          <div className="flexChild" onClick={() => this.props.startGame(game)}>{game.name}</div>
        </div>
      )
    })

    return (
      <div>
        { games }
      </div>
    );
  }
};

export default GameList;
