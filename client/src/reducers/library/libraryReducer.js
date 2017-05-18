import * as ACTIONTYPES from 'constants/library/actionTypes';
import { fromJS } from 'immutable';

export const INITIAL_STATE = {
	loading: false,
	active: null
};
export default function (state = fromJS(INITIAL_STATE), action) {
	const { payload = {}, params = {} } = action;
	const { data = {} } = payload;
	let newState = {};
	switch (action.type) {
		case ACTIONTYPES.SETBOOKLOADING:
			return loading(state);
		case ACTIONTYPES.SETBOOK:
			newState = loading(state, false);
			return setBook(newState, data, params);
	}
	return state;
};

export function loading(state, bool = true) {
	return state.set('loading', bool);
}

export function setBook(state, data = {}, params = {}) {
	if (data.volumeInfo) {
		return state.set('active', data.volumeInfo);
	}
	return state;
}
