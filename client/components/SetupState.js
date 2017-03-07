import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/games';
import { getPlayers } from '../actions/players';

class SetupState extends React.Component {
  componentDidMount() {
    this.props.dispatch(getGames());
    this.props.dispatch(getPlayers());
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { games: state.games, players: state.players }
}

export default connect(mapStateToProps)(SetupState);
