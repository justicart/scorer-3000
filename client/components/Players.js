import React from 'react';
import PlayerForm from './PlayerForm';
import GamesList from './GamesList';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h3>Players</h3>
        <PlayerForm />
      </div>
    );
  }
};

export default Settings;
