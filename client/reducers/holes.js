const holes = ( state = [], action ) => {
  switch (action.type) {
    case 'HOLES':
      return action.holes
    case 'ADD_HOLE':
      return [ action.hole, ...state ]
    case 'UPDATE_HOLE':
      return state.map( hole => {
        if (hole._id === action.hole._id)
          return action.hole;
        return hole;
      })
    case 'DELETE_HOLE':
      return state.filter( hole => hole._id !== action.id )
    default:
      return state;
  }
}

export default holes;
