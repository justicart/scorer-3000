
export const saveScore = (data) => {
  console.warn(data);
  return (dispatch) => {
    $.ajax({
      url: '/api/scores',
      type: 'POST',
      data: {
        score: data.score,
        playerId: data.playerId,
        holeId: data.holeId,
        hole: data.hole,
        gameId: data.gameId,
      }
    }).done( score => {
      return dispatch({ type: 'ADD_GAME_SCORE', score })
    }).fail( err => {
      console.error(err);
    })
  }
}
