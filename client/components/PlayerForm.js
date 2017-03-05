import React from 'react';

class PlayerForm extends React.Component {
  state = { name: '', image: '' };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: '/players',
      type: 'POST',
      data: this.state
    }).done( player => {
      this.props.getPlayers();
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" type="text" onChange={this.handleChange} placeholder="Player Name" />
        <input name="image" type="text" onChange={this.handleChange} placeholder="Player Picture URL" />
        <button className="btn" type="submit">Add Player</button>
      </form>
    );
  }
};

export default PlayerForm;
