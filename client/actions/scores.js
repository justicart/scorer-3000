
export const saveScore = (data) => {
  // console.warn(data);
  return (dispatch) => {
    $.ajax({
      url: '/api/scores',
      type: 'POST',
      data: {
        score: data.score,
        playerId: data.playerId,
        holeId: data.holeId,
        gameId: data.gameId,
      }
    }).done( score => {
      // console.log(score);
    }).fail( err => {
      console.error(err);
    })
  }
}
