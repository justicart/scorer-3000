import React from 'react';
import PlayerForm from './PlayerForm';
import GamesList from './GamesList';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h3>Games</h3>
        <GamesList />
      </div>
    );
  }
};

export default Settings;
