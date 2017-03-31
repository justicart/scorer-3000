import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import { saveScore } from '../actions/scores';
import { updateHole } from '../actions/holes';
import { getHolesForGame, getScoresForGame, getScoresForHole } from '../actions/games';

class Game extends React.Component {
  state = { holeIndex: 0, gameScores: [], scores: [] };

  componentDidMount = () => {
    this.props.dispatch(getHolesForGame(this.props.params.id));
    this.props.dispatch(getScoresForGame(this.props.params.id));
    this.props.dispatch(getScoresForHole(this.props.params.id, this.props.params.number));
  }

  increaseScore = (playerId) => {
    const scores = this.state.scores;
    let count = 1;
    if (scores[playerId]) {
      count = scores[playerId] + 1;
    }
    scores[playerId] = count
    this.setState( (state) => {
      return { scores }
    })
  }

  decreaseScore = (playerId) => {
    const scores = this.state.scores;
    let count = -1;
    if (scores[playerId]) {
      count = scores[playerId] - 1;
    }
    scores[playerId] = count
    this.setState( (state) => {
      return { scores }
    })
  }

  setScore = (playerId, score) => {
    const scores = this.state.scores;
    scores[playerId] = parseInt(score);
    this.setState( (state) => {
      return { scores }
    })
  }

  saveHole = (e) => {
    e.preventDefault();
    const holeId = this.props.hole._id;
    const hole = this.props.hole.hole;
    const game = this.props.game;
    const gameId = game._id;
    Object.entries(this.state.scores).map( score => {
      const data = {
        score: score[1],
        playerId: score[0],
        holeId,
        hole,
        gameId,
      }
      this.props.dispatch(saveScore(data));
    })
    this.setState( (state) => {
      return { scores: {} }
    })
    this.props.dispatch(updateHole(this.props.router, gameId, holeId, game.holes));
  }

  render() {
    const game = this.props.game || {};
    const holes = this.props.holes || {};
    const hole = this.props.hole || {};
    const holeName = hole.name || '';
    const par = hole.par || '';
    const gameScores = this.props.gameScores || [];
    const savedScores = this.props.scores || [];
    const formattedScores = {};
    savedScores.map(score => {
      return formattedScores[score.playerId] = score.score;
    })
    const { name = '', playerIds = [], playedHoles = [] } = game;
    const gamePar = holes.filter( el => {
      return el.hole <= hole.hole
    })
    .reduce((total, hole) => {
      return total + hole.par
    }, 0);
    const scoring = this.props.players.filter( player => {
      return playerIds.indexOf(player._id) > -1;
    }).map( player => {
      return (
        <Score
          key={player._id}
          player={player}
          gameId={game._id}
          holeId={hole._id}
          hole={hole.hole}
          par={par}
          gamePar={gamePar}
          gameScores={gameScores}
          scores={this.state.scores}
          savedScores={formattedScores}
          decreaseScore={this.decreaseScore}
          increaseScore={this.increaseScore}
          setScore={this.setScore}
        />
      )
    })
    return (
      <div>
        <h3>{holeName} <span className="small">Par {par}</span></h3>
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
    holes: state.holes,
    hole: state.holes.find( h => {
      return h.gameId === props.params.id && h.hole === parseInt(props.params.number)
    }),
    gameScores: state.gameScores,
    scores: state.scores,
  }
}

export default connect(mapStateToProps)(Game);
