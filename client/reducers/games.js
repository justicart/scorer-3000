const games = ( state = [], action ) => {
  switch (action.type) {
    case 'GAMES':
      return action.games
    case 'ADD_GAME':
      return [ action.note, ...state ]
    case 'UPDATE_GAME':
      return state.map( note => {
        if (note._id === action.note._id)
          return action.note;
        return note;
      })
    case 'DELETE_GAME':
      return state.filter( note => note._id !== action.id )
    default:
      return state;
  }
}

export default games;
