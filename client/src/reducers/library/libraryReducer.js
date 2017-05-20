import * as ACTIONTYPES from 'constants/library/actionTypes';
import * as consts from 'constants/library/libraryConstants';

import { fromJS } from 'immutable';

export const INITIAL_STATE = {
	[consts.loading]: false,
	[consts.active]: null
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
	return state.set(consts.loading, bool);
}

export function setBook(state, data = {}, params = {}) {
	if (data.volumeInfo) {
		return state.set(consts.active, data.volumeInfo);
	}
	return state;
}
