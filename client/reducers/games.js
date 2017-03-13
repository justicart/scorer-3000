const games = ( state = [], action ) => {
  switch (action.type) {
    case 'GAMES':
      return action.games
    case 'ADD_GAME':
      return [ action.game, ...state ]
    case 'UPDATE_GAME':
      return state.map( game => {
        if (game._id === action.game._id)
          return action.game;
        return game;
      })
    case 'DELETE_GAME':
      return state.filter( game => game._id !== action.id )
    default:
      return state;
  }
}

export default games;
