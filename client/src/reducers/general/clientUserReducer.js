import Immutable, { fromJS, List } from 'immutable';
import * as ACTIONTYPES from 'ReactApp/constants/general/clientUserActions';
export const INITIAL_STATE = { };

export default function (state = fromJS(INITIAL_STATE), action) {
	const { payload = {}, params = {} } = action;
	const { data = {} } = payload;
	let newState = {};
	switch (action.type) {
	case ACTIONTYPES.SIGNIN_LOADING:
		return state;
	case ACTIONTYPES.SIGNIN_FETCHED:
		newState = setData(state, data, params);
		return newState.set('token', payload.token);
	case ACTIONTYPES.SIGNIN_ERROR:
		return state;
	}
	return state;
}

export function setData(state, data = {}, params = {}) {
	return fromJS(data);
}
