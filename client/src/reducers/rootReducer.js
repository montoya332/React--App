import { combineReducers } from 'redux';
import libraryBook from './library/libraryReducer';
import clientUser from './general/clientUserReducer';
const rootReducer = combineReducers({
	clientUser,
	libraryBook
});

export default rootReducer;
