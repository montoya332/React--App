import * as ACTIONTYPES from 'constants/library/actionTypes';
import * as ACTIONS from 'actionCreator/library/actions';
import {getBook, getBooks} from 'actionCreator/general/googleApi';
import {mockStore, expect} from 'Test';
describe('library Actions', () => {
	let initialState,
		getState,
		action,
		expectedActions,
		store;
	beforeEach(() => {
		initialState = {};
		getState = {};
	});

	it('should execute fetch data', () => {
		store = mockStore({});
		return store.dispatch(ACTIONS.getData())
			.then(() => {
				const actions = store.getActions();
				expect(actions[1].type).to.equal(ACTIONTYPES.GETDATA);
			});
	});
});
