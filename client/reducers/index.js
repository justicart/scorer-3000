import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import games from './games';
import players from './players';
import flash from './flash';

const rootReducer = combineReducers({
  routing: routerReducer,
  games,
  players,
  flash,
});

export default rootReducer;
