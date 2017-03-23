import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import games from './games';
import players from './players';
import flash from './flash';
import user from './user';
import holes from './holes';

const rootReducer = combineReducers({
  routing: routerReducer,
  games,
  players,
  flash,
  user,
  holes,
});

export default rootReducer;
