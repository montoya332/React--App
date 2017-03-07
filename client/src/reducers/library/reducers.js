import Immutable, { fromJS, List } from 'immutable';
import * as ACTIONTYPES from '../../constants/library/actionTypes';
const INITIAL_STATE = {};

export default function(state = fromJS(INITIAL_STATE), action) {
	const { payload = {}, params = {} } = action;
	const { data = {} } = payload;
	let newState = {};
	switch (action.type) {
		case ACTIONTYPES.SETBOOK:
			return setBook(state,data,params)
	}

	return state;
};

function setBook(state, data = {}, params = {}) {
	return fromJS(data).toJS()
}