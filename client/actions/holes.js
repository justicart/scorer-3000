import { setFlash } from './flash';

export const getHoles = () => {
  return (dispatch) => {
    $.ajax({
      url: `/api/holes`,
      type: 'GET'
    }).done( holes => {
      dispatch({ type: 'HOLES', holes })
    });
  }
}

export const updateHole = (router, gameId, holeId, holes) => {
  return (dispatch) => {
    const date = new Date();
    $.ajax({
      url: `/api/holes/${holeId}`,
      type: 'PUT',
    }).done( hole => {
      dispatch({ type: 'UPDATE_HOLE', hole });
      // console.log(hole, holes)
      if (hole.hole < holes)
        return router.push(`/games/${gameId}/hole/${hole.hole + 1}`);
      return router.push(`/games/${gameId}`);
    });
  }
}
