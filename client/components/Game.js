import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import { saveScore } from '../actions/scores';
import { updateHole } from '../actions/holes';

class Game extends React.Component {
  state = { holeIndex: 0, scores: {} };

  increaseScore = (playerId) => {
    const scores = this.state.scores;
    let count = 1;
    if (scores[playerId] !== undefined) {
      count = scores[playerId] + 1;
    }
    scores[playerId] = count
    this.setState({ scores });
  }

  decreaseScore = (playerId) => {
    const scores = this.state.scores;
    let count = -1;
    if (scores[playerId] !== undefined) {
      count = scores[playerId] - 1;
    }
    scores[playerId] = count
    this.setState({ scores });
  }

  setScore = (playerId, score) => {
    const scores = this.state.scores;
    scores[playerId] = parseInt(score);
    this.setState({ scores });
  }

  saveHole = (e) => {
    e.preventDefault();
    const holeId = this.props.hole._id;
    const game = this.props.game;
    const gameId = game._id;
    Object.entries(this.state.scores).map( score => {
      const data = {
        score: score[1],
        playerId: score[0],
        holeId,
        gameId,
      }
      console.warn('data',data);
      this.props.dispatch(saveScore(data));
    })
    this.props.dispatch(updateHole(this.props.router, gameId, holeId, game.holes))
  }

  render() {
    const game = this.props.game || {};
    const hole = this.props.hole || '';
    const holeName = hole.name || '';
    const { name, playerIds, playedHoles } = game;
    const scoring = this.props.players.filter( player => {
      return playerIds.indexOf(player._id) > -1;
    }).map( player => {
      return (
        <Score
          key={player._id}
          player={player}
          gameId={game._id}
          holeId={hole._id}
          scores={this.state.scores}
          decreaseScore={this.decreaseScore}
          increaseScore={this.increaseScore}
          setScore={this.setScore}
        />
      )
    })
    return (
      <div>
        <h3>{holeName}</h3>
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
    players: state.players,
    hole: state.holes.find( h => {
      return h.gameId === props.params.id && h.hole === parseInt(props.params.number)
    })
  }
}

export default connect(mapStateToProps)(Game);
