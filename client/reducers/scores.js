const scores = ( state = [], action ) => {
  switch (action.type) {
    case 'SCORES':
      return action.scores
    case 'ADD_SCORE':
      return [ action.score, ...state ]
    case 'UPDATE_SCORE':
      return state.map( score => {
        if (score._id === action.score._id)
          return action.score;
        return score;
      })
    case 'DELETE_SCORE':
      return state.filter( score => score._id !== action.id )
    default:
      return state;
  }
}

export default scores;
