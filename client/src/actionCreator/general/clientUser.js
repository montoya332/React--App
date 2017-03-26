import { app } from 'utils/socketio';
import { api } from 'utils/utils';
import * as ACTIONTYPES from 'ReactApp/constants/general/clientUserActions';

/*  General ({email,password})   */
export function signinUser(params={}) {
	params.type = params.type || 'local'
	return app.authenticate(params)
}
export function createUser(params) {
	params.type = params.type || 'local'
	return api.post('/signup',params)
}
/* Client User Actions */
export function signin(params={}) {
	return dispatch => {
		dispatch({type: ACTIONTYPES.SIGNIN_LOADING, payload: params })
		return signinUser(params)
			.then(response => dispatch({type: ACTIONTYPES.SIGNIN_FETCHED, payload: response }))
			.catch(error => dispatch({type: ACTIONTYPES.SIGNIN_ERROR, payload: error }))
	}
}

export function signup(params={}) {
	return dispatch => {
		dispatch({type: ACTIONTYPES.SIGNIN_LOADING, payload: params })
		return createUser(params)
				.then(()=> {
					signinUser(params)
							.then(response => dispatch({type: ACTIONTYPES.SIGNIN_FETCHED, payload: response }))
							.catch(error => dispatch({type: ACTIONTYPES.SIGNIN_ERROR, payload: error }))
				})
				.catch(error => dispatch({type: ACTIONTYPES.SIGNIN_ERROR, payload: error }))
	}
}