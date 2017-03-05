import React from 'react';

class Hole extends React.Component {
  state = {
    gameId: this.props.game._id,
    playerIds: this.props.game.playerIds,
    name: '',
    hole: '',
    date: '',
  }

  render() {
    const scoring = this.props.players.filter( player => {
      return this.state.playerIds.indexOf(player._id) > -1;
    }).map( player => {
      const style = { background: `url(${player.image}) no-repeat 50% 50%/cover` };
      return (
        <div className="rowParent" key={player._id}>
          <div className="picture flexChild shrink" style={ style }></div>
          <input className="flexChild" name={player._id} />
        </div>
      )
    })
    return (
      <div>
        <form onSubmit={this.saveHole}>
          { scoring }
          <button className="btn" type="submit">Save Hole</button>
        </form>
      </div>
    );
  }
};

export default Hole;
