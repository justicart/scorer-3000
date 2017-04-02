import React from 'react';
import { connect } from 'react-redux';
import { getHolesForGame, getScoresForGame } from '../actions/games';
import classNames from 'classnames';

class Game extends React.Component {
  componentDidMount() {
    this.props.dispatch(getHolesForGame(this.props.params.id));
    this.props.dispatch(getScoresForGame(this.props.params.id));
  }

  render() {
    const { name = '', playerIds = [] } = this.props.game || {};
    const holes = this.props.holes || [];
    const players = this.props.players || [];
    const gameScores = this.props.gameScores || [];
    const playerList = players.filter( p => {
      return playerIds.indexOf(p._id) > -1;
    }).map( player => {
      const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
      const scoresHeader = holes
      .sort((a, b) => {
        return a.hole - b.hole
      })
      .map(hole => {
        const holeNumber = hole.hole || '';

        return (
          <td key={hole._id} className="flexChild">{holeNumber}</td>
        )
      });
      const scores = holes
      .sort((a, b) => {
        return a.hole - b.hole
      })
      .map(hole => {
        const holeScore = gameScores.find(s => s.holeId === hole._id && s.playerId === player._id) || {};
        const score = holeScore.score || '-';
        const holePar = hole.par || '';
        const holeStyle = classNames(
          'flexChild',
          {
            over: score > holePar,
            under: score < holePar,
          }
        )
        return (
          <td key={hole._id} className={holeStyle}>{score}</td>
        )
      });
      const totalScore = gameScores
      .filter( el => {
        return el.score && el.playerId === player._id
      })
      .reduce((total, score) => {
        return total + score.score
      }, 0);
      return (
        <div key={player._id} className="collection col s12 m6">
          <div className="collection-item avatar">
            <div style={playerStyle} className="circle"></div>
            {player.name}
          </div>
          <div className="collection-item scoreboard">
            <table>
              <thead>
                <tr className="rowParent">
                  {scoresHeader}
                  <td className="total flexChild">
                    T
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="rowParent">
                  {scores}
                  <td className="total flexChild">
                    {totalScore}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    })
    return (
      <div>
        <h3>{name}</h3>
        { playerList }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    game: state.games.find( g => g._id === props.params.id),
    players: state.players,
    holes: state.holes,
    gameScores: state.gameScores,
  }
}

export default connect(mapStateToProps)(Game);
