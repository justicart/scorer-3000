import React from 'react';

class Score extends React.Component {
  componentDidMount() {
    const playerId = this.props.player._id;
    // console.warn(this.props.savedScores[playerId]);
    this.props.setScore(playerId, this.props.savedScores[playerId])
  }

  setScore = (e) => {
    e.preventDefault();
    const score = parseInt(e.target.value);
    this.props.setScore(this.props.player._id, score)
  }

  render() {
    let manualScore;
    const player = this.props.player;
    const playerStyle = { background: `url(${player.image}) no-repeat 50% 50%/cover`};
    const playerId = player._id;
    let score = this.props.scores[player._id] || 0;
    const totalScore = this.props.gameScores
    .filter( el => {
      return el.hole && el.score && el.hole < this.props.hole && el.playerId === playerId
    })
    .reduce((total, score) => {
      // console.log('total', total, player.name)
      return total + score.score
    }, 0);
    console.log(this.props.gamePar, totalScore)
    let overunder = (this.props.gamePar - (totalScore + score)) * -1
    if (overunder > 0)
      overunder = `+${overunder}`

    // console.log('OVERUNDER', overunder);
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
