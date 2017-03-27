import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import { saveScore } from '../actions/scores';
import { updateHole } from '../actions/holes';
import { getHolesForGame, getScoresForGame, getScoresForHole } from '../actions/games';

class Game extends React.Component {
  state = { holeIndex: 0, gameScores: {}, scores: {} };

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
    this.setState({ scores });
  }

  decreaseScore = (playerId) => {
    const scores = this.state.scores;
    let count = -1;
    if (scores[playerId]) {
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
      // console.warn('data',data);
      this.props.dispatch(saveScore(data));
      this.setState({ scores: {} })
    })
    this.props.dispatch(updateHole(this.props.router, gameId, holeId, game.holes))
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
      console.log(el.hole, hole.hole)
      return el.hole <= hole.hole
    })
    .reduce((total, hole) => {
      console.log('par', hole)
      return total + hole.par
    }, 0);
    console.log("game par",gamePar)
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
    gameScores: state.scores.gameScores,
    scores: state.scores.scores,
  }
}

export default connect(mapStateToProps)(Game);
