import chai, { expect } from 'chai';

import Immutable, { is, fromJS } from 'immutable';
import * as ACTIONTYPES from 'constants/library/actionTypes';
import reducer, { INITIAL_STATE } from 'stores/library/reducers';

describe('Library Reducer', () => {
	let expected,
		actual,
		action,
		nextState;
	it('should return the initial state', () => {
		expected = fromJS(INITIAL_STATE);
		actual = reducer(undefined, {});
		expect(is(expected, actual)).to.be.true;
	});

	it('handles LOADING', () => {
		action = {
			type: ACTIONTYPES.SETBOOKLOADING,
		};
		actual = reducer(undefined, action);
		expect(actual.get('loading')).to.be.true;
	});

});
