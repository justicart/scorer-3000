const players = ( state = [], action ) => {
  switch (action.type) {
    case 'PLAYERS':
      return action.players
    case 'ADD_PLAYER':
      return [ action.player, ...state ]
    case 'UPDATE_PLAYER':
      return state.map( player => {
        if (player._id === action.player._id)
          return action.player;
        return player;
      })
    case 'DELETE_PLAYER':
      return state.filter( player => player._id !== action.id )
    default:
      return state;
  }
}

export default players;
