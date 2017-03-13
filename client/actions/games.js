import { setFlash } from './flash';

export const getGames = () => {
  // action can only do
  // dispatch({ type: 'GAMES', games })
  // async possible bc of thunk
  return (dispatch) => {
    $.ajax({
      url: '/api/games',
      type: 'GET'
    }).done( games => {
      dispatch({ type: 'GAMES', games })
    });
  }
}

export const addGame = (router, playerIds) => {
  const date = new Date();
  return (dispatch) => {
    $.ajax({
      url: '/api/games',
      type: 'POST',
      data: {
        playerIds: playerIds,
        holes: 18,
        playedHoles: [],
        name: date.toLocaleString(),
        date: date
      }
    }).done( game => {
      dispatch({ type: 'ADD_GAME', game });
      // dispatch(setFlash('Game Added', 'success'))
      router.push(`/games/${game._id}`);
    }).fail( err => {
      let errors = err.responseJSON.errors;
      let messages = Object.keys(errors)
      .map( key => {
        return( `${key} ${errors[key].kind}`)
      }).join(', ');
      dispatch(setFlash(messages, 'error'));
    })
  }
}

export const updateGame = (id, title, body) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/games/${id}`,
      type: 'PUT',
      data: { title, body }
    }).done( game => {
      dispatch({ type: 'UPDATE_GAME', game });
    });
  }
}

export const deleteGame = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/games/${id}`,
      type: 'DELETE'
    }).done( () => {
      dispatch({ type: 'DELETE_GAME', id });
      dispatch(setFlash('Game Deleted', 'success'))
    });
  }
}
