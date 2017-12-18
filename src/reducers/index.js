import { combineReducers } from 'redux';
import TitlesReducer from './reducer_titles';


const rootReducer = combineReducers({
  titles: TitlesReducer,
});

export default rootReducer;
