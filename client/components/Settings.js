import React from 'react';
import PlayerForm from './PlayerForm';
import GamesList from './GamesList';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <h3>Players</h3>
        <PlayerForm />
        <ul />
        <h3>Games</h3>
        <GamesList />
      </div>
    );
  }
};

export default Settings;
