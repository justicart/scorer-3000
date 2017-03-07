import { setFlash } from './flash';

export const getPlayers = () => {
  // action can only do
  // dispatch({ type: 'PLAYERS', players })
  // async possible bc of thunk
  return (dispatch) => {
    $.ajax({
      url: '/api/players',
      type: 'GET'
    }).done( players => {
      dispatch({ type: 'PLAYERS', players })
    });
  }
}

export const addPlayer = (name, image) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/players',
      type: 'POST',
      data: { name, image }
    }).done( player => {
      dispatch({ type: 'ADD_PLAYER', player });
      dispatch(setFlash('Player Added', 'success'))
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

export const updatePlayer = (id, title, body) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/players/${id}`,
      type: 'PUT',
      data: { title, body }
    }).done( player => {
      dispatch({ type: 'UPDATE_PLAYER', player });
    });
  }
}

export const deletePlayer = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/players/${id}`,
      type: 'DELETE'
    }).done( () => {
      dispatch({ type: 'DELETE_PLAYER', id });
      dispatch(setFlash('Player Deleted', 'success'))
    });
  }
}
