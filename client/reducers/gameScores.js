const scores = ( state = [], action ) => {
  switch (action.type) {
    case 'GAME_SCORES':
      return action.scores
    case 'ADD_GAME_SCORE':
      return [ action.score, ...state ]
    case 'UPDATE_GAME_SCORE':
      return state.map( score => {
        if (score._id === action.score._id)
          return action.score;
        return score;
      })
    default:
      return state;
  }
}

export default scores;
