import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import games from './games';
import players from './players';
import flash from './flash';
import user from './user';
import holes from './holes';
import scores from './scores';

const rootReducer = combineReducers({
  routing: routerReducer,
  games,
  players,
  flash,
  user,
  holes,
  scores,
});

export default rootReducer;
