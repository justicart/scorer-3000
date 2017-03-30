import React from 'react';

class Score extends React.Component {
  componentDidMount() {
    const playerId = this.props.player._id;
    this.props.setScore(playerId, this.props.savedScores[playerId])
  }

  setScore = (e) => {
    e.preventDefault();
    const score = parseInt(e.target.value);
    this.props.setScore(this.props.player._id, score)
  }

  render() {
    let manualScore;
    let { gameScores, scores, player, gamePar, par, hole } = this.props;
    const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
    const playerId = player._id;
    const score = scores[player._id] || '-';
    const totalScore = gameScores
    .filter( el => {
      return el.hole && el.score && el.hole < hole && el.playerId === playerId
    })
    .reduce((total, score) => {
      return total + score.score
    }, 0);
    let overunder =
      (totalScore + (score === '-' ? 0 : score)) - (gamePar - (score === '-' ? par : 0))
    if (overunder > 0)
      overunder = `+${overunder}`

    return (
      <div className="collection-item avatar" key={player._id}>
        <div style={playerStyle} className="circle"></div>
        <span className="title">{ player.name }, {overunder}</span>
        <p>Stats here</p>
        <div className="secondary-content score rowParent">
          <div
            className="btn decrease flexChild"
            onClick={ () => this.props.decreaseScore(player._id) }
          >-</div>
          <input
            className="flexChild"
            value={score}
            onChange={this.setScore}
          />
          <div
            className="btn increase flexChild"
            onClick={ () => this.props.increaseScore(player._id) }
          >+</div>
        </div>
      </div>
    )
  }
};

export default Score;
