import { combineReducers } from 'redux';
import libraryBook from './library/reducers';

const rootReducer = combineReducers({
  libraryBook
});

export default rootReducer;
